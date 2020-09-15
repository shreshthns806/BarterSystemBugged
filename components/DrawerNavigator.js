import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {BottomTabNavigator} from './BottomTabNavigator'
import {Icon} from 'react-native-elements';
import AddItemScreen from '../screens/AddItem';
import ExchangeItemScreen from '../screens/ExchangeItem';
import MyBarters from '../screens/MyBarters'
import SideBarMenu from './SideBarMenu'
import SettingScreen from '../screens/SettingsScreen';
import {StackNavigator} from './StackNavigator'
export const DrawerNavigator = createDrawerNavigator(
    {
        Home : {
            screen: BottomTabNavigator,
            navigationOptions:{
                drawerIcon :
                <Icon
                    name = 'home' 
                    type = 'font-awesome' 
                    color = 'black'
                />,
            }
        },
        AddItems: {
            screen: AddItemScreen,
            navigationOptions:{
                drawerIcon :
                <Icon
                    name = 'plus' 
                    type = 'font-awesome' 
                    color = 'black'
                />,
                drawerLabel : "Add Items"
            }
        },
        MyBarters: {
            screen: MyBarters,
            navigationOptions:{
                drawerIcon :
                <Icon
                    name = 'child' 
                    type = 'font-awesome' 
                    color = 'black'
                />,
                drawerLabel : "My Barters"
            }
        },
        ExchangeItems : {
            screen:StackNavigator,
            navigationOptions:{
                drawerIcon :
                    <Icon
                        name = 'exchange' 
                        type = 'font-awesome' 
                        color = 'black'
                    />,
                drawerLabel : "Exchange Items"
            }
        },
        SettingScreen : {
            screen: SettingScreen,
            navigationOptions:{
                drawerIcon :
                <Icon
                    name = 'cogs' 
                    type = 'font-awesome' 
                    color = 'black'
                    size = {20}
                />,
                drawerLabel : "Settings"
            }
        },
    },
    {
        contentComponent : SideBarMenu
    },
    {
        initialRouteName : 'Home'
    }
);
