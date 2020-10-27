import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'

import { StyleSheet, Text, View, Modal, ScrollView, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { Header,Icon, Badge } from 'react-native-elements';

export default class SettingScreen extends React.Component {
    
    constructor(){
        super()
        this.state = {
            userFirstName : '',
            userLastName  : '',
            userAddress   : '',
            userContact   : '',
            userName      : '',
            userEmail     : firebase.auth().currentUser.email,
            docID         : '',
            value:'',
        }
    }
    getNumberOfUnreadNotifications = ()=> {
        db.collection('allNotifications').where('notification_status','==','unread')
        .where("targetedID",'==',this.state.userEmail).onSnapshot((snapshot)=>{
          var unreadNotifications = snapshot.docs.map((doc)=>{
            return doc.data();
          })
          this.setState({
            value:unreadNotifications.length
          })
        }
        )
    }
    updateProfile = ()=> {
        if (this.state.userName!='' && this.state.userContact!='' && this.state.userAddress!='' && this.state.userFirstName!='' && this.state.userLastName!=''){
            db.collection('users').doc(this.state.docID).update({
                address : this.state.userAddress,
                contact : this.state.userContact,
                firstname : this.state.userFirstName,
                lastname : this.state.userLastName,
                username : this.state.userName,
            })
            console.log(this.state.address)
        }
        else {
            Alert.alert('Please fill all Details')
        }
    }

    getCredentials = (email)=> {
        db.collection('users').where("email","==",email).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data = doc.data();
                this.setState({
                    userFirstName : data.firstname,
                    userLastName : data.lastname,
                    userAddress : data.address,
                    userContact : data.contact,
                    userName : data.username,
                    docID : doc.id,
                })
            })
        })
    }

    componentDidMount(){
        this.getCredentials(this.state.userEmail)
        this.getNumberOfUnreadNotifications()
    }

    render(){
        return (
            <View style = {styles.container}>
                <Header
                    backgroundColor={'#222831'}
                    centerComponent={{
                    text: 'Settings',
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
                <ScrollView>
                <Text style = {styles.text}>Change your profile from this screen!</Text>
                <Text style = {styles.text}>Username 👇</Text>
                <TextInput
                    style = {styles.textInput}
                    value = {this.state.userName}
                    onChangeText = {(txt)=>{
                        this.setState({
                            userName : txt
                        })
                    }}
                ></TextInput>
                <Text style = {styles.text}>Firstname 👇</Text>
                <TextInput
                    style = {styles.textInput}
                    value = {this.state.userFirstName}
                    onChangeText = {(txt)=>{
                        this.setState({
                            userFirstName : txt
                        })
                    }}
                ></TextInput>
                <Text style = {styles.text}>Lastname 👇</Text>
                <TextInput
                    style = {styles.textInput}
                    value = {this.state.userLastName}
                    onChangeText = {(txt)=>{
                        this.setState({
                            userLastName : txt
                        })
                    }}
                ></TextInput>
                <Text style = {styles.text}>Address 👇</Text>
                <TextInput
                    style = {styles.textInput}
                    value = {this.state.userAddress}
                    onChangeText = {(txt)=>{
                        this.setState({
                            userAddress : txt
                        })
                    }}
                    multiline = {true}
                    numberOfLines = {8}
                ></TextInput>
                <Text style = {styles.text}>Contact 👇</Text>
                <TextInput
                    style = {styles.textInput}
                    value = {this.state.userContact}
                    onChangeText = {(txt)=>{
                        this.setState({
                            userContact : txt
                        })
                    }}
                    keyboardType = 'numeric'
                ></TextInput>
                <TouchableOpacity style = {styles.button} onPress = {this.updateProfile}>
                    <Text style = {styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
            </ScrollView>
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
        width:150,
        marginTop:20,
        marginBottom:10,
        alignSelf:'center',
        height:40,
    },
    textInput:{
        padding:10,
        alignSelf:'center',
        borderWidth:5,
        borderColor:'#32e0c4',
        width:300,
        color:"#eeeeee",
    },
    text : {
        color:"#eeeeee",
        textAlign:'center',
        marginTop:20,
    }
})