import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import {Icon} from 'react-native-elements'
import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{

    render(){
        return(
            <View style = {{flex:1, marginTop:20}}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}></DrawerItems>
                </View>
                <View style = {styles.logOutContainer}>
                        <Icon
                            name = 'sign-out' 
                            type = 'font-awesome' 
                            color = 'black'
                            onPress={
                                ()=>{
                                    this.props.navigation.navigate('Login')
                                    firebase.auth().signOut();
                                }
                            }
                        ></Icon>
                        <Text style = {{textAlign:'center'}}>Sign Out</Text>
                </View>
            </View>
        )
    }

}

var styles = StyleSheet.create({
    container : {
      flex:1
    },
    drawerItemsContainer:{
      flex:0.8
    },
    logOutContainer : {
      flex:0.1,
      justifyContent:'flex-end',
      paddingBottom:20
    },
    logOutButton : {
      height:30,
      width:'100%',
      justifyContent:'center',
      padding:10
    },
    logOutText:{
      fontSize: 30,
      fontWeight:'bold'
    }
  })