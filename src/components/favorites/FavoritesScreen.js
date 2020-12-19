import React, { Component } from "react";
import {FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../../res/Colors";
import FavoritesEmptyState from "./FavoritesEmprtyState";
import Storage from '../../libs/storage';
import CoinItem from '../CoinItem';

class FavoritesScreen extends Component {

  state = {
    favorites: []
  }

  componentDidMount() {
    this.getFavorites()
    this.props.navigation.addListener("focus", this.getFavorites)
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("focus", this.getFavorites)
  }

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys()
      const allFavKeys = allKeys.filter((key) => key.includes("favorite-"))
      const allFavStr = await Storage.instance.getAll(allFavKeys)
      const favorites = allFavStr.map((fav) => JSON.parse(fav[1]))
      this.setState({favorites})
      //console.log(this.state.favorites)
    }catch (error) {
      console.log("Error in get fav", error)
    }
  }

  handlePress = (coin) => {
    this.props.navigation.navigate("CoinDetail", { coin })
  }

  render() {

    const { favorites } = this.state
    return (

      <View style={styles.container}>
        { favorites.length <= 0 ? <FavoritesEmptyState /> :
            <FlatList data={favorites} renderItem={({item}) =>
                <CoinItem item={item}
                          onPress={ () => this.handlePress(item) } /> } />
          }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
})
export default FavoritesScreen;
