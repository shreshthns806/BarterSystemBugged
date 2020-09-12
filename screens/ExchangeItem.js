import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'

import { StyleSheet, Text, View, Modal, ScrollView, FlatList, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';



export default class ExchangeItemScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            itemList:[],
            isComponentMounted : false
        }
    }
    getItems = ()=> {
        console.log('18')  
        this.ref = db.collection('items').onSnapshot((snapshot)=> {
            var item = snapshot.docs.map((document)=>{
                {return document.data()}
            })
            this.setState({
                itemList:item,
            })
    })
    }

    componentDidMount(){
        //this.getItems
        this.ref = db.collection('items').onSnapshot((snapshot)=> {
            var item = snapshot.docs.map((document)=>{
                {return document.data()}
            })
            this.setState({
                itemList:item,
                isComponentMounted:true
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
                        <Icon 
                            name = 'exchange' 
                            type = 'font-awesome' 
                            color = '#15aabf' 
                        ></Icon>
                    }
                ></Header>
                <View style = {{flex:1}}>
                {
                    this.state.itemList.length == 0 && this.state.isComponentMounted == true
                    ?(
                        <Text style = {styles.buttonText}>Sorry, there are currently no requests!</Text>
                    )
                    
                    :(
                        <FlatList
                            keyExtractor = {(item,index)=>{
                                return index.toString();
                            }}
                            data = {this.state.itemList}
                            renderItem = {
                                ({item, i})=>{
                                    return(
                                    <ListItem
                                        key = {i}
                                        title = {item.item_name}
                                        subtitle = {item.item_description}
                                        titleStyle = {{color:'#32e0c4'}}
                                        subtitleStyle = {{color : '#eeeeee'}}
                                        containerStyle = {{backgroundColor : '#393e46'}}
                                        rightElement = {
                                            <TouchableOpacity
                                                style = {styles.button}
                                                onPress = {()=>{
                                                    this.props.navigation.navigate('ItemDetailScreen',{"details":item})
                                                }}
                                            >
                                                <Text style = {styles.buttonText}>
                                                    View
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    ></ListItem>)
                                }
                                
                            }
                        ></FlatList>
                    )
                }
                </View>
            </View>
        )}
        
    
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