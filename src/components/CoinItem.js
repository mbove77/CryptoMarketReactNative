import React from "react";
import {View, Text, Image, StyleSheet, Platform, Pressable} from  'react-native';
import Colors from "../res/Colors";
import Currency from '../libs/Currency';

const CoinItem = ({item, onPress}) => {


  function getImgArrow() {
    if(item.percent_change_1h > 0) {
      return require("cripto/src/assets/arrow_up.png")
    } else {
      return require("cripto/src/assets/arrow_down.png")
    }
  }

  return (
   <Pressable onPress={onPress} style={styles.container}>
     <View style={styles.row}>
       <Text style={styles.symbolText}>{item.symbol}</Text>
       <Text style={styles.nameText}>{item.name}</Text>
       <Text style={styles.priceText}>$ {Currency.instance.format(item.price_usd)}</Text>
     </View>
     <View style={styles.row}>
       <Text style={styles.percentText}>{item.percent_change_1h}</Text>
       <Image style={styles.imgIcon} source={getImgArrow()} />
     </View>
   </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    color: Colors.white,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 0.5,
    marginLeft: Platform.OS === 'ios' ? 16 : 0
  },
  row: {
    flexDirection: "row"
  },
  symbolText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize:16,
    marginRight: 12
  },
  nameText: {
    color: Colors.white,
    fontSize:14
  },
  priceText: {
    color: Colors.white,
    fontSize:15,
    marginLeft: 12
  },
  percentText: {
    color: Colors.white,
    fontSize:12
  },
  imgIcon: {
    width: 22,
    height: 22,
    marginLeft: 8
  }
})

export default CoinItem;
