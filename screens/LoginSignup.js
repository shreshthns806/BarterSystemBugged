import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'
import { StyleSheet, Text, View, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { Header } from 'react-native-elements';
class LoginSignupScreen extends React.Component {
    
    constructor(){
      super();
      this.state = {
        emailID:'',
        password:'',
      }
    }

    componentDidMount(){
        this.resetState
    }

    resetState = ()=> {
        this.setState({
            emailID:'',
            password:'',
        })
    }

    signup = async ()=> {
        const email = this.state.emailID;
        const password = this.state.password;
        if(email && password){
            try{
                const response = await firebase.auth().createUserWithEmailAndPassword(email,password)
                if(response){
                    Alert.alert('User added succesfully')
                }
            }
            catch(error){
                Alert.alert(error.message)
            }

        }
        else {
            Alert.alert('Please enter Email ID and Password')
        }
    }

    reset = ()=> {
        this.setState({
            emailID:'',
            password:'',
        })
    }

    login = async ( email, password )=> {
        if(email && password){
            try{
                console.log('39')
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                console.log('41')
                console.log(response)
                if(response){
                    console.log("logged in")
                    Alert.alert('Login Succesfull')   
                }
            }
            catch(error){
                
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert('User does not exist');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Incorrect Email ID or password');
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('Incorrect Password')
                        break;
                    
                }
            }
        }
        else{
            Alert.alert('Please Enter Email and Password!')
        }
    }

    render(){
      return(
        <KeyboardAvoidingView style = {styles.container}>
        <Header
            backgroundColor={'#32e0c4'}
            centerComponent={{
              text: 'Barter System',
              style: { color: '#222831', fontSize: 20 },
            }}
        />
        <TextInput
            style={styles.textInput}
            keyboardType='email-address'
            placeholder='Enter your Email ID here.....'
            onChangeText={
                (text)=>{
                    this.setState({
                        emailID:text,
                    })
                    console.log(this.state.emailID)
                }
            }
            value = {this.state.emailID} 
        ></TextInput>
        <TextInput
            style={styles.textInput}
            placeholder='Enter your Password here.....'
            secureTextEntry = {true}
            onChangeText={
                (text)=>{
                    this.setState({
                        password:text,
                    })
                    console.log(this.state.emailID)
                }
            }
            value = {this.state.emailID} 
        ></TextInput>
        <TouchableOpacity
           style={styles.button}
           onPress = {()=>
                {
                    this.login(this.state.emailID,this.state.password)
                    this.reset();
                }
            }
        >
            <Text
                style={styles.buttonText}
            >
                Login
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={
                ()=>{
                    this.signup();
                    this.reset();
                }
            }
        >
            <Text
                style={styles.buttonText}
            >
                Signup
            </Text>
        </TouchableOpacity>
        <Image
            source={{
              uri:
                'https://i.ytimg.com/vi/YNIAOt7zzmQ/maxresdefault.jpg',
            }}
            style={{ width: 270, marginTop:35, height: 140, alignSelf: 'center' }}
          />
        </KeyboardAvoidingView>
      )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#222831',
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
    button:{
        backgroundColor:'#393e46',
        width:250,
        marginTop:25,
        alignSelf:'center',
        height:40,
    },
    buttonText:{
        padding:10,
        color:'#eeeeee',
        alignSelf:'center',
    },
    text:{
        color:'#222831'
    }
})

export default LoginSignupScreen