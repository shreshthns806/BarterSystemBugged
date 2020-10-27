import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AddItemScreen from '../screens/AddItem'
import ExchangeItemScreen from '../screens/ExchangeItem';
import {StackNavigator} from './StackNavigator'
import {Icon} from 'react-native-elements'
export const BottomTabNavigator = createBottomTabNavigator({
    AddItem : {
        screen:AddItemScreen,
        navigationOptions :{
            tabBarIcon : <Icon
                name = 'plus' 
                type = 'font-awesome' 
                color = 'black'
            />,
            tabBarLabel : "Add Items",
        }
    },
    ExchangeItem : {screen:ExchangeItemScreen,
        navigationOptions :{
            tabBarIcon : <Icon
                name = 'exchange' 
                type = 'font-awesome' 
                color = 'black'
            />,
            tabBarLabel : "Exchange Items",
        }
    },
})