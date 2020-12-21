import React, { Component } from "react";
import {Alert, Image, SectionList, FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../../res/Colors";
import Http from "../../libs/http";
import CoinMarketItem from "./CoinMarketItem";
import shortid from "shortid"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Storage from "../../libs/storage"
import Currency from '../../libs/Currency';

class CoinDetailScreen extends Component {

  state = {
    coin: [],
    markets: [],
    isFavorite: false
  }

  componentDidMount() {
    const  { coin } =  this.props.route.params
    this.props.navigation.setOptions({title: coin.symbol})

    this.getMarkets(coin.id)
    this.setState({coin}, () => {
      this.getFavorite()
    })
  }

  getSymbolIcon = (nameid) => {
    if (nameid) {
      return `https://c1.coinlore.com/img/25x25/${nameid}.png`;
    }
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
    const markets = await Http.instance.get(url)
    this.setState({markets})
    //console.log("market", markets)
  }

  getSections = (coin) => {
    return [
      {
        title: "Market cap",
        data: [`$ ${Currency.instance.format(coin.market_cap_usd)}` ]
      },
      {
        title: "Volume 24h",
        data: [`$ ${Currency.instance.format(coin.volume24)}`]
      },
      {
        title: "Change 24h",
        data: [`$ ${Currency.instance.format(coin.percent_change_24h)}`]
      },
    ]
  }

  toggleFavorites = () => {
    if (this.state.isFavorite) {
      this.removeFavorite()
    } else {
      this.addFavorite()
    }
  }

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`
      const isFavorite = await Storage.instance.get(key);
      if(isFavorite != null) {
        this.setState({isFavorite : true})
       } else {
        this.setState({isFavorite : false})
      }
    } catch (e) {
      console.log("Favorite error", e)
    }
  }

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin)
    const key = `favorite-${this.state.coin.id}`
    const stored = await Storage.instance.store(key, coin)
    if (stored) {
      this.setState({isFavorite : true})
    }
  }

  removeFavorite = async () => {
    Alert.alert("Remove Favorite", "Are you sure you want remove this favorite?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: "Remove",
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`
          await Storage.instance.remove(key)
          this.setState({isFavorite: false})
        },
        style: 'destructive'
      }
    ])
  }

  render() {
    const { coin, markets, isFavorite }  = this.state
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>

          <View style={styles.row}>
            <Image
              style={styles.imageSymbol}
              source={{uri: this.getSymbolIcon(coin.nameid)}} />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>

          <View>
            <Pressable onPress={this.toggleFavorites}
              style={[styles.btnFavorite, isFavorite ? styles.btnFavoriteDelete : styles.btnFavoriteAdd]}>
              <Text style={styles.btnFavoriteText}>{isFavorite ?  "Remove Favorite" : "Add Favorite"}</Text>
            </Pressable>
          </View>

        </View>

        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) =>
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          }
          renderSectionHeader={({section}) =>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View> } />

            <Text style={styles.titleText}>Markets</Text>
            <FlatList
              keyExtractor={(item) => shortid.generate()}
              style={styles.marketList}
              horizontal={true}
              data={markets}
              renderItem={({item}) => <CoinMarketItem market={item} /> }
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  row: {
    flexDirection: "row"
  },
  subHeader: {
    backgroundColor: "rgba(0,0,0, 0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    fontSize:16,
    fontWeight: "bold",
    color: Colors.white,
    marginLeft: 8
  },
  imageSymbol: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220
  },
  sectionHeader: {
    backgroundColor: "rgba(0,0,0, 0.2)",
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: Colors.white,
    fontSize: 14
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold"
  },
  marketList: {
    maxHeight: 75,
    margin: 8
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd : {
    backgroundColor: Colors.picton
  },
  btnFavoriteDelete : {
    backgroundColor: Colors.carmine
  },
  btnFavoriteText: {
    color: Colors.white
  }
})

export default CoinDetailScreen;
