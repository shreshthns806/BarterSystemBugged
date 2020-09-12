import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'

import { StyleSheet, Text, View, Modal, ScrollView, FlatList, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';



export default class ItemDetailScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            currentUserID : firebase.auth().currentUser.email,
            itemAdderID : this.props.navigation.getParam('details')["userID"],
            itemID : this.props.navigation.getParam('details')["item_ID"],
            itemName : this.props.navigation.getParam('details')["item_name"],
            itemDescription : this.props.navigation.getParam('details')["item_description"],
            itemAdderName:'',
            itemAdderContact:'',
            itemAdderAddress:'',
            itemDocID:'',
        }
    }

    getItemAdderRequest = ()=>{
        const itemAdderID = this.state.itemAdderID
        const itemID = this.state.itemID
        var adderDetails = db.collection('users').where(email,'==',itemAdderID).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    itemAdderAddress : doc.data().address,
                    itemAdderName : doc.data().firstname,
                    itemAdderContact : doc.data().itemAdderContact,
                })
            })
        })
        var itemDocID = db.collection('items').where('item_ID','==',itemID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    itemDocID:doc.id,
                })
            })
        })
    }

    render(){
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
    
                    <FlatList
                        keyExtractor = {(item,index)=>{
                            return index.toString();
                        }}
                        data = {this.state.itemList}
                        renderItem = {
                            ({item, i})=>{
                                return(
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
                                        <TouchableOpacity style = {styles.button}>
                                            <Text style = {styles.buttonText}>I want to Exchange</Text>        
                                        </TouchableOpacity>
                                    </ScrollView>
                                )
                            }
                            
                        }
                    ></FlatList>
            </View>
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
    text:{
        color:'white',
        padding:5,
        textAlign:'center'
    },
    textSubHeading:{
        color:'white',
        padding:5,
        textAlign:'center'
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