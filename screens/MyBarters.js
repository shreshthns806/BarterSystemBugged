import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'

import { StyleSheet, Text, View, Modal, ScrollView, FlatList, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';



export default class MyBarters extends React.Component{
    constructor(){
        super();
        this.state = {
            allUserBarters : null,
            currentEmailID : firebase.auth().currentUser.email
        }
    }

    getAllUserBarters = async ()=> {
        const currentEmailID = this.state.currentEmailID
        var query = await db.collection('AllBarters')
        .where("itemExchangerID","==",currentEmailID).onSnapshot(snapshot => {
            var item =snapshot.docs.map(document => {
                return document.data()
            })
            this.setState({
                allUserBarters : item
            })
            console.log(this.state.allUserBarters)
        })
    }

    componentDidMount = ()=>{
        this.getAllUserBarters()
    }

    render(){
        return( 
            <View style = {styles.container}>
                <Header
                    backgroundColor={'#222831'}
                    centerComponent={{
                    text: 'My Barters',
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
                            name = 'child' 
                            type = 'font-awesome' 
                            color = '#15aabf' 
                        ></Icon>
                    }
                ></Header>
                <View style = {{flex:1}}>
                    
                        <FlatList
                            keyExtractor = {(item,index)=>{
                                return (index.toString()    )
                            }}
                            data = {this.state.allUserBarters}
                            renderItem = {({item,i})=>{
                                <ListItem
                                        key = {i}
                                        title = {item.itemName}
                                        subtitle = {item.itemAdderID}
                                        titleStyle = {{color:'#32e0c4'}}
                                        subtitleStyle = {{color : '#eeeeee'}}
                                        containerStyle = {{backgroundColor : '#393e46'}}
                                        bottomDivider
                                    ></ListItem>
                            }
                        }
                        >
                            
                        </FlatList>
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