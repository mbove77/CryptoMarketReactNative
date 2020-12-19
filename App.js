/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import CoinStack from "./src/components/CoinStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from  "react-native";
import Colors from "./src/res/Colors";
import FavoriteStack from "./src/components/favorites/FavoriteStack";

const Tabs = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
        <Tabs.Navigator
          tabBarOptions={
            {
              tintColor: "#fefefe",
              style: {
                backgroundColor: Colors.blackPearl,
              }
            }
          }>
          <Tabs.Screen
            name="Coins"
            component={CoinStack}
            options={ {
              tabBarIcon: ({size, color}) => (
                <Image
                  style={{tintColor: color, width: size, height: size}}
                  source={require('cripto/src/assets/bank.png')} />
              )
            }}
          />

          <Tabs.Screen
            name="Favorites"
            component={FavoriteStack}
            options={ {
              tabBarIcon: ({size, color}) => (
                <Image
                  style={{tintColor: color, width: size, height: size}}
                  source={require('cripto/src/assets/star.png')} />
              )
            }}
          />

      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
