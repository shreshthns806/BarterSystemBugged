import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'

import { StyleSheet, Text, View, Modal, ScrollView, FlatList, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';



export default class ItemDetailScreen extends React.Component{
    render(){
        return(
            <View>
                <Text>Ha ahahahhahah</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#393e46',
        alignSelf:'center',
        width:'100%'
    },
    title:{
        backgroundColor:'#222831',
        color:'#32e0c4',
        fontSize:23,
        padding:5,
        alignContent:'center',
        textAlign:'center',
    },
    buttonText:{
        padding:10,
        color:'#32e0c4',
        alignSelf:'center',
    },
    button:{
        backgroundColor:'#222831',
        width:100,
        marginTop:20,
        alignSelf:'center',
        height:40,
    },
    textInput:{
        marginTop:30,
        padding:10,
        alignSelf:'center',
        borderWidth:5,
        borderColor:'#32e0c4',
        width:300,
        color:"#eeeeee",
    },
})