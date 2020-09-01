import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/LoginSignup';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AddItemScreen from './screens/AddItem'
import ExchangeItemScreen from './screens/ExchangeItem';

export default class App extends React.Component {
  render (){
    return (
      <AppContainer></AppContainer>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const tabNavigator = createBottomTabNavigator({
  ExchangeItem : {screen:ExchangeItemScreen},
  AddItem : {screen:AddItemScreen},
})

const switchNavigator = createSwitchNavigator({
  Login : {screen:WelcomeScreen},
  TabNavigator : {screen:tabNavigator},
})

const AppContainer = createAppContainer(switchNavigator)