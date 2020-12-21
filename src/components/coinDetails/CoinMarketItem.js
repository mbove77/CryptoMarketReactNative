import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../res/Colors";
import Currency from '../../libs/Currency';

const CoinMarketItem = ({market}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{market.name}</Text>
      <Text style={styles.priceText}>$ {Currency.instance.format(market.price_usd)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.1)",
    borderColor: Colors.zircon,
    borderWidth: 0.5,
    padding: 16,
    marginRight: 8,
    alignItems: "center"
  },
  nameText: {
    color: "#FFF",
    fontWeight: "bold"
  },
  priceText: {
    color: "#FFF",
  }
})

export default CoinMarketItem;
