import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'
    import {
        Animated,
        Dimensions,
        StyleSheet,
        Text,
        TouchableHighlight,
        View,
        FlatList,
    } from 'react-native';
    import { ListItem, Header, Icon, Badge } from 'react-native-elements';

    import { SwipeListView } from 'react-native-swipe-list-view';
export default class NotificationScreen extends React.Component {
    
    constructor(){
        super()
        this.state = {
            currentEmailID : firebase.auth().currentUser.email,
            allUnreadNotifications: [],
            value:'',
            notificationID : ''
        }
    }
    renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}></Text>
            </View>
        </View>
    );
    updateMarkAsread =(notification)=>{
        const email = firebase.auth().currentUser.email
        //console.log(notification)
        db.collection('allNotifications')
            .where('notification_status','==','unread')
            .where('targetedID','==',email)
            .where('notification_message','==',notification.notification_message).get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        notificationID:doc.id
                    })
                    //console.log(doc.id)
                })
            })
      }
    renderItem = data => (
        <Animated.View>
        <ListItem
        title = {data.item.itemName}
        subtitle = {data.item.notification_message}
        titleStyle = {{color : '#32e0c4'}}
        subtitleStyle = {{color:'#eeeeee'}}
        containerStyle = {{backgroundColor : '#393e46'}}
        bottomDivider
    ></ListItem>

        </Animated.View>
    )

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
    onSwipeValueChange = swipeData => {
        var allNotifications = this.state.allUnreadNotifications
          const {key,value} = swipeData;
    
          if(value < -Dimensions.get('window').width){
            const newData = [...allNotifications];

            const prevIndex = allNotifications.findIndex(item => item.key === key);
            this.updateMarkAsread(allNotifications[prevIndex]);
            console.log(allNotifications[prevIndex])
            newData.splice(prevIndex, 1);
            
        };
    };
    componentDidMount () {
        this.getNumberOfUnreadNotifications()
        const currentEmailID = this.state.currentEmailID
            
        var query1 = db.collection('allNotifications')
        .where('notification_status','==','unread')
        .where('targetedID','==',currentEmailID).onSnapshot(snapshot => {
            var item = snapshot.docs.map(document => {
                return document.data()
            })
            this.setState({
                allUnreadNotifications : item
            })
        })
    }

    render(){
        return (
            <View style = {styles.container}>
                <Header
                    backgroundColor={'#222831'}
                    centerComponent={{
                    text: 'Notifications',
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
                        data = {this.state.allUnreadNotifications}
                        keyExtractor = {(item,index)=>{
                            return (index.toString())
                        }}
                        renderItem = {({item,i})=>{
                            return(
                                <ListItem
                                    key = {i}
                                    title = {item.notification_message}
                                    subtitle = {item.notification_message}
                                    titleStyle = {{color:'#32e0c4'}}
                                    subtitleStyle = {{color : '#eeeeee'}}
                                    containerStyle = {{backgroundColor : '#393e46'}}
                                    bottomDivider
                                ></ListItem>
                            )
                        }}
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
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
})