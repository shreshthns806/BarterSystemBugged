import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'

import { StyleSheet, Text, View, Modal, ScrollView, FlatList, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { ListItem, Header, Icon, Badge } from 'react-native-elements';



export default class ItemDetailScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            currentUserID : firebase.auth().currentUser.email,
            itemAdderID : this.props.navigation.getParam('details')["userID"],
            itemID : this.props.navigation.getParam('details')["item_ID"],
            itemName : this.props.navigation.getParam('details')["item_name"],
            itemDescription : this.props.navigation.getParam('details')["item_description"],
            itemStatus : this.props.navigation.getParam('details')["item_status"],
            itemAdderName:'',
            itemAdderContact:'',
            itemAdderAddress:'',
            itemDocID:'',
            itemAdderEmail:'',
            currentUsername : '',
            value:'',
        }
    }

    getCurrentUsername = () => {
        const currentUserID = this.state.currentUserID
        const query = db.collection('users').where("email","==",currentUserID).get().then(snapshot => {
            snapshot.forEach((doc)=>{
                var data = doc.data();
                this.setState({
                    currentUsername:data.username,
                })
            })
        })
        
    }
    addNotification = ()=> {
        const currentUserID = this.state.currentUserID
        const itemAdderID = this.state.itemAdderID
        const itemName = this.state.itemName
        const currentUsername = this.state.currentUsername
        const message = currentUsername + ' with email as ' + currentUserID + ' is interested in ' + itemName  
        db.collection('allNotifications').add({
            'notification_message' : message,
            'senderID' : currentUserID,
            'targetedID' : itemAdderID,
            'notification_status':'unread',
            'itemName' : itemName
        })
        
    }
    getItemAdderRequest = async ()=>{
        const itemAdderID = this.state.itemAdderID
        const itemID = this.state.itemID
        var adderDetails = await db.collection('users').where('email','==',itemAdderID).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    itemAdderAddress : doc.data().address,
                    itemAdderName : doc.data().firstname,
                    itemAdderContact : doc.data().contact,
                    itemAdderEmail : doc.data().email,
                    
                })
            })
        })
        var itemDocID = await db.collection('items').where('item_ID','==',itemID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    itemDocID:doc.id,
                })
            })
        })
    }

    updateBookStatus = async ()=> {
        const ItemDocID = this.state.itemDocID
        db.collection('items').doc(ItemDocID).update({
            'item_status' : 'Other Barter Interested'
        })
        const uniqueID = Math.random().toString(36).substring(2)
        const itemName = this.state.itemName
        const itemID = this.state.itemID
        const itemAdderID = this.state.itemAdderID
        const itemExchangerID = this.state.currentUserID
        db.collection('AllBarters').add({
            'itemName' : itemName,
            'itemID' : itemID,
            'itemAdderID' : itemAdderID,
            'itemExchangerID' : itemExchangerID,
            'barterID' : uniqueID,
            'itemStatus' : 'Other Barter Interested'
        })
    
    }

    componentDidMount = ()=> {
        this.getCurrentUsername()
        this.getItemAdderRequest()
        console.log('ItemDetail')
    }

    render(){
        const currentUserID = this.state.currentUserID
        const itemAdderID = this.state.itemAdderEmail
        if(currentUserID != itemAdderID){
            return(
            <View style = {styles.container}>
            <Header
                backgroundColor={'#222831'}
                centerComponent={{
                text: 'Exchange Items',
                style: { color: '#32e0c4', fontSize: 20 },
                }}
                leftComponent = {
                    <Icon 
                        name = 'arrow-left' 
                        type = 'feather' 
                        color = 'white' 
                        onPress = {
                            ()=>{
                                this.props.navigation.goBack()
                            }
                        }
                    ></Icon>
                }
            ></Header>
            <View style = {{flex:1}}>
                                        <Text style = {[styles.textSubHeading],{color:'red', textAlign:'center'}}>Note: This window is scrollable</Text>

                                    <ScrollView>
                                        <Text style = {styles.title}>Item Details</Text>
                                        <Text style = {styles.textSubHeading}>Item Name</Text>                                    
                                        <Text style = {styles.text}>{this.state.itemName}</Text>
                                        <Text style = {styles.textSubHeading}>Item Description</Text>                                    
                                        <Text style = {styles.text}>{this.state.itemDescription}</Text>
                                        <Text style = {styles.textSubHeading}>Item Status</Text>                                    
                                        <Text style = {styles.text}>{this.state.itemStatus}</Text>
                                        <Text style = {styles.title}>Item Adder Details</Text>
                                        <Text style = {styles.textSubHeading}>Item Adder Name</Text>                                    
                                        <Text style = {styles.text}>{this.state.itemAdderName}</Text>
                                        <Text style = {styles.textSubHeading}>Item Adder Contact</Text>                                    
                                        <Text style = {styles.text}>{this.state.itemAdderContact}</Text>
                                        <Text style = {styles.textSubHeading}>Item Adder Address</Text>                                    
                                        <Text style = {styles.text}>{this.state.itemAdderAddress}</Text>
                                        <TouchableOpacity style = {styles.button} onPress = {()=>{
                                            this.updateBookStatus()
                                            this.addNotification()
                                        }}>
                                            <Text style = {styles.buttonText}>I want to Exchange</Text>        
                                        </TouchableOpacity>
                                    </ScrollView>
            </View>
        </View>
        )}
        else {
            return(
                <View style = {styles.container}>
                <Header
                    backgroundColor={'#222831'}
                    centerComponent={{
                    text: 'Exchange Items',
                    style: { color: '#32e0c4', fontSize: 20 },
                    }}
                    leftComponent = {
                        <Icon 
                            name = 'arrow-left' 
                            type = 'feather' 
                            color = 'white' 
                            onPress = {
                                ()=>{
                                    this.props.navigation.goBack()
                                }
                            }
                        ></Icon>
                    }
                ></Header>
                <View style = {{flex:1}}>
                                        <Text style = {[styles.textSubHeading],{color:'red',textAlign:'center'}}>Note: This wondow is Scrollable</Text>
                                        <ScrollView>
                                            <Text style = {styles.title}>Item Details</Text>
                                            <Text style = {styles.textSubHeading}>Item Name</Text>                                    
                                            <Text style = {styles.text}>{this.state.itemName}</Text>
                                            <Text style = {styles.textSubHeading}>Item Description</Text>                                    
                                            <Text style = {styles.text}>{this.state.itemDescription}</Text>
                                            <Text style = {styles.title}>Item Adder Details</Text>
                                            <Text style = {styles.textSubHeading}>Item Adder Name</Text>                                    
                                            <Text style = {styles.text}>{this.state.itemAdderName}</Text>
                                            <Text style = {styles.textSubHeading}>Item Adder Contact</Text>                                    
                                            <Text style = {styles.text}>{this.state.itemAdderContact}</Text>
                                            <Text style = {styles.textSubHeading}>Item Adder Address</Text>                                    
                                            <Text style = {styles.text}>{this.state.itemAdderAddress}</Text>
                                            <Text style = {[styles.textSubHeading,{color:'red'}]}>You cannot exchange with your own item!</Text>
                                        </ScrollView>
                </View>
            </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#393e46',
        alignSelf:'center',
        width:'100%'
    },
    text:{
        color:'white',
        padding:5,
        textAlign:'center'
    },
    textSubHeading:{
        color:'orange',
        padding:5,
        marginTop:10,
        textAlign:'center'
    },
    title:{
        color:'#32e0c4',
        fontSize:23,
        padding:5,
        marginTop:10,
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
        width:150,
        marginTop:20,
        alignSelf:'center',
        height:40,
        marginBottom:10,
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