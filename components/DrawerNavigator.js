import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {BottomTabNavigator} from './BottomTabNavigator'
import {Icon} from 'react-native-elements';
import MyBarters from '../screens/MyBarters'
import SideBarMenu from './SideBarMenu'
import SettingScreen from '../screens/SettingsScreen';
import NotifcationScreen from '../screens/Notifications';
import ItemDetailScreen from '../screens/ItemDetailScreen'
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
        Notifications : {
            screen: NotifcationScreen,
            navigationOptions:{
                drawerIcon :
                    <Icon
                        name = 'bell' 
                        type = 'font-awesome' 
                        color = 'black'
                    />,
                drawerLabel : "Notifications"
            }
        },
        ItemDetailScreen : {
            screen : ItemDetailScreen,            
        navigationOptions:{
            drawerLabel : " "
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
