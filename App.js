import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/LoginSignup';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {DrawerNavigator} from './components/DrawerNavigator';

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

const switchNavigator = createSwitchNavigator({
  Login : {screen:WelcomeScreen},
  DrawerNavigator : {screen:DrawerNavigator},
})

const AppContainer = createAppContainer(switchNavigator)