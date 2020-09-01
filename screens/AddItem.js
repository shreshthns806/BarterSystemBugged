import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'

import { StyleSheet, Text, View, Modal, ScrollView, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { Header } from 'react-native-elements';

export default class AddItemScreen extends React.Component {
    
    constructor(){
        super()
        this.state = {
            itemName:'',
            itemDescription:'',
            userID : firebase.auth().currentUser.email,
            itemID:'',
        }
    }
    
    addItem = async ()=> {
        const name = this.state.itemName
        const description = this.state.itemDescription
        const itemID = Math.random().toString(36).substring(2)
        const user = this.state.userID
        if (name && description) {
            db.collection('items').add({
                "item_name" : name,
                "item_description" : description,
                "item_ID" : itemID,
                "userID" : user
            })
            this.setState({
                itemName:'',
                itemDescription:'',
            })
            Alert.alert('Item Added Succesfully')
        }
        else {
            Alert.alert('Please fill Item Name and/or Description')
        }
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>Add Item</Text>
                <TextInput
                    style = {styles.textInput}
                    placeholder = 'Item Name'
                    onChangeText={
                        (text)=>{
                            this.setState({
                                itemName:text,
                            })
                        }
                    }
                    value = {this.state.itemName}
                ></TextInput>
                <TextInput
                    style = {[styles.textInput,{ height:300}]}
                    placeholder = 'Item Description'
                    multiline = {true}
                    onChangeText={
                        (text)=>{
                            this.setState({
                                itemDescription:text,
                            })
                        }
                    }
                    value = {this.state.itemDescription}
                ></TextInput>
                <TouchableOpacity style = {styles.button} onPress = {this.addItem}>
                    <Text style = {styles.buttonText}>Add Item</Text>
                </TouchableOpacity>
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