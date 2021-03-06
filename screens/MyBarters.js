import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'
import { StyleSheet, Text, View, Modal, ScrollView, FlatList, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { ListItem, Header, Icon, Badge } from 'react-native-elements';



export default class MyBarters extends React.Component{
    constructor(){
        super();
        this.state = {
            allUserBarters : [],
            currentUsername : '',
            itemAdderID:'',
            itemName:'',
            currentEmailID : firebase.auth().currentUser.email,
            docID:'',
            value:'',
        }
    }
    getNumberOfUnreadNotifications = ()=> {
        db.collection('allNotifications').where('notification_status','==','unread')
        .where("targetedID",'==',this.state.currentEmailID).onSnapshot((snapshot)=>{
          var unreadNotifications = snapshot.docs.map((doc)=>{
            return doc.data();
          })
          this.setState({
            value:unreadNotifications.length
          })
        }
        )
    }
    getCurrentUsername = () => {
        const currentUserID = this.state.currentEmailID
        const query = db.collection('users').where("email","==",currentUserID).get().then(snapshot => {
            snapshot.forEach((doc)=>{
                var data = doc.data();
                this.setState({
                    currentUsername:data.username,
                })
            })
        })
        
    }
    addNotification =  (item)=> {
        

        const currentUserID = this.state.currentEmailID
        const itemName = item.itemName
        const currentUsername = this.state.currentUsername
        const message = currentUsername + ' with Email as ' + currentUserID + ' has sent you the item '+ itemName+'.'
        const itemAdderID = item.itemAdderID
        db.collection('allNotifications').add({
            'notification_message' : message,
            'senderID' : currentUserID,
            'targetedID' : itemAdderID,
            'notification_status':'unread',
            'itemName' : itemName
        })

        

    }

    updateBookStatus = async (item) => {
        
        const itemID = item.itemID
        
        await db.collection('AllBarters').where('itemID','==',itemID).get().then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    docID:doc.id
                })
            })
        })

        const docID = this.state.docID
        
            db.collection('AllBarters').doc(docID).update({
                itemStatus : 'itemSent'
            })
        
    }

    componentDidMount = ()=>{
        this.getNumberOfUnreadNotifications()
        const currentEmailID = this.state.currentEmailID
        var query = db.collection('AllBarters')
        .where("itemExchangerID","==",currentEmailID).onSnapshot(snapshot => {
            var item =snapshot.docs.map(document => {
                return document.data()
            })
            this.setState({
                allUserBarters : item,
            })
        })
        this.getCurrentUsername();
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
                <View style = {{flex:1}}>
                    <FlatList
                        data = {this.state.allUserBarters}
                        keyExtractor = {(item,index)=>{
                            return (index.toString())
                        }}
                        renderItem = {({item,i})=>{
                            return(
                                <ListItem
                                    key = {i}
                                    title = {item.itemName}
                                    subtitle = {item.itemAdderID}
                                    titleStyle = {{color:'#32e0c4'}}
                                    subtitleStyle = {{color : '#eeeeee'}}
                                    containerStyle = {{backgroundColor : '#393e46'}}
                                    rightElement = {
                                        <TouchableOpacity
                                            style = {styles.button}
                                            onPress = {()=>{
                                                this.addNotification(item)
                                                this.updateBookStatus(item)
                                            }}
                                        >
                                            <Text style = {styles.buttonText}>
                                                Exchange
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    bottomDivider
                                ></ListItem>
                            )
                        }}
                    ></FlatList>
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
        color:'#32e0c4',
        fontSize:13,
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
        marginTop:10,
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