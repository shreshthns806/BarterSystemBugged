import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'

import { StyleSheet, Text, View, Modal, ScrollView, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { Header,Icon,Badge } from 'react-native-elements';

export default class AddItemScreen extends React.Component {
    
    constructor(){
        super()
        this.state = {
            itemName:'',
            itemDescription:'',
            userID : firebase.auth().currentUser.email,
            itemID:'',
            activeBarters:'',
            userDocID : '',
            itemDocID:'',
            requestedBarter:'',
            requestedBarterID:'',
            requestedBarterDescription:'',
            refresh:'',
            value:'',
        }
    }
    getNumberOfUnreadNotifications = ()=> {
        db.collection('allNotifications').where('notification_status','==','unread')
        .where("targetedID",'==',this.state.userID).onSnapshot((snapshot)=>{
          var unreadNotifications = snapshot.docs.map((doc)=>{
            return doc.data();
          })
          this.setState({
            value:unreadNotifications.length
          })
        }
        )
    }
    updateAPI = ()=> {
        const userID = this.state.userID
        db.collection('users').where('email','==',userID).get().then(snapshot => {
            snapshot.forEach(doc => {
                var data = doc.data()
                this.setState({
                    activeBarters : data.activeBarters,
                    userDocID : doc.id
                })
            })
        })
        this.getRequestedBarter()
    }

    componentDidMount = ()=> {
        this.getNumberOfUnreadNotifications()
        this.updateAPI()
    }

    updateStatus = ()=> {
        const docID = this.state.itemDocID
        db.collection('items').doc(docID).update({
            'item_status' : 'received'
        })
    }

    addRequestedItem = ()=> {
        const itemName = this.state.requestedBarter
        const itemDescription = this.state.requestedBarterDescription
        const itemID = this.state.requestedBarterID
        const user = this.state.userID
        db.collection('receivedItems').add({
            'item_name' : itemName,
            'item_description' : itemDescription,
            'item_ID' : itemID,
            'item_status' : 'received',
            'userID' : user,
        })
    }

    addReceivedNotification = ()=> {
        const itemName = this.state.requestedBarter
        const userID = this.state.userID
        const message = "You received " + itemName + '. Congratulations!'
        db.collection('allNotifications').add({
            'notification_message' : message,
            'senderID' : userID,
            'targetedID' : userID,
            'notification_status':'unread',
            'itemName' : itemName,
        })
    }

    addNotification = ()=> {
        const itemName = this.state.itemName
        const userID = this.state.userID
        const message = 'You just added '+ itemName + ' to our item list! Thanks!'
        db.collection('allNotifications').add({
            'notification_message' : message,
            'senderID' : userID,
            'targetedID' : userID,
            'notification_status':'unread',
            'itemName' : itemName,
        })
    }

    getRequestedBarter = ()=> {
        const userID = this.state.userID
        db.collection('items').where('userID','==',userID).get().then(snapshot => {
            snapshot.forEach(doc => {
                if(doc.data().item_status!='received'){
                    this.setState({
                        requestedBarter:doc.data().item_name,
                        requestedBarterDescription:doc.data().item_description,
                        itemDocID:doc.id,
                        requestedBarterID:doc.data().item_ID
                    })
                }
            })
        })
    }

    refresh = ()=> {
        const random = Math.random().toString(36).substring(2)
        this.setState({
            refresh:random
        })
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
                "userID" : user,
                "item_status" : "available"
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

    updateAcitveBarters = (number)=> {
        const docID = this.state.userDocID
        const numberArg = number
        db.collection('users').doc(docID).update({
            activeBarters : numberArg,
        })
        this.updateAPI()
    }

    render(){
        
        if (this.state.activeBarters === 1) {
            return(
                <View style = {styles.container}>
                    <Header
                        backgroundColor={'#222831'}
                        centerComponent={{
                        text: 'Add Items',
                        style: { color: '#32e0c4', fontSize: 20 },
                        }}
                        leftComponent = {
                            <Icon 
                                name = 'bars' 
                                type = 'font-awesome' 
                                color = 'white' 
                                onPress = {
                                    ()=>{
                                        this.props.navigation.toggleDrawer()
                                    }
                                }
                            ></Icon>
                        }
                        rightComponent = {
                            <View>
                                <Icon
                                name = 'bell'
                                type = 'font-awesome'
                                color = "#15aabf"
                                size = {25}
                                onPress = {()=>{
                                    this.props.navigation.navigate('Notifications')
                                }}
                                ></Icon>
                                <Badge
                                value = {this.state.value}
                                containerStyle = {{position : 'absolute', top:-4, right:-4}}
                                ></Badge>
                            </View>
                        }
                    ></Header>
                    <Text style = {{color:'#eeeeee', textAlign : 'center', fontSize:18,marginTop:30}}>Sorry, You already have an active request!</Text>
                    <Text style = {{color:'#eeeeee', textAlign : 'center', fontSize:18,marginTop:30}}>{this.state.requestedBarter}</Text>
                    <Text style = {{color:'#eeeeee', textAlign : 'center', fontSize:18,marginTop:30}}>{this.state.requestedBarterDescription}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress = {()=>{
                            this.updateAcitveBarters(0)
                            this.updateStatus()
                            this.addReceivedNotification()
                            this.addRequestedItem()
                        }}
                    >
                        <Text style = {styles.buttonText}>I received the item</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
        else {
            return (
                <View style = {styles.container}>
                    <Header
                        backgroundColor={'#222831'}
                        centerComponent={{
                        text: 'Add Items',
                        style: { color: '#32e0c4', fontSize: 20 },
                        }}
                        leftComponent = {
                            <Icon 
                                name = 'bars' 
                                type = 'font-awesome' 
                                color = 'white' 
                                onPress = {
                                    ()=>{
                                        this.props.navigation.toggleDrawer()
                                    }
                                }
                            ></Icon>
                        }
                        rightComponent = {
                            <View>
    <Icon
      name = 'bell'
      type = 'font-awesome'
      color = "#15aabf"
      size = {25}
      onPress = {()=>{
        this.props.navigation.navigate('Notifications')
      }}
    ></Icon>
    <Badge
      value = {this.state.value}
      containerStyle = {{position : 'absolute', top:-4, right:-4}}
    ></Badge>
</View>
                        }
                    ></Header>
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
                    <TouchableOpacity style = {styles.button} onPress = {()=>{
                        
                        this.refresh()
                        this.addItem()
                        this.updateAcitveBarters(1)
                        this.addNotification()
                        this.props.navigation.navigate('Notifications')
                        }}>
                        <Text style = {styles.buttonText}>Add Item</Text>
                        
                    </TouchableOpacity>
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
        textAlign:'center',
    },
    button:{
        backgroundColor:'#222831',
        width:100,
        marginTop:40,
        alignSelf:'center',
        height:60,
        alignItems:'center',
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