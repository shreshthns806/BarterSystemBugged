import * as React from 'react';
import * as firebase from 'firebase';
import db from '../config'
import { StyleSheet, Text, View, Modal, ScrollView, TextInput , Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { Header } from 'react-native-elements';
class WelcomeScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        emailID:'',
        password:'',
        isModalVisible:false,
        confirmPassword:'',
        username:'',
        mobileNumber:'',
        address:'',
        firstName:'',
        lastName:'',
      }
    }

    isModalVisible = ()=>{
        this.setState({
            isModalVisible:false,
        })
    }

    resetState = ()=> {
        this.setState({
            emailID:'',
            password:'',
        })
    }

    showModal = ()=> {
        return(
            <Modal
                animationType='fade'
                transparent = {false}
                visible = {this.state.isModalVisible}
            >
                <View style = {styles.modalContainer}>
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <Text style = {styles.modalTitle}>Signup Form</Text>
                            <Text style = {{color:'#eeeeee', textAlign:'center', marginTop:10}}>Already a user?</Text>
                            <TouchableOpacity
                                style = {styles.signupButton}
                                onPress={this.isModalVisible}
                            >
                                <Text style = {styles.signupButtonText}>Login</Text>

                            </TouchableOpacity>
                            <TextInput
                                style={styles.textInput1}
                                keyboardType='email-address'
                                placeholder='Email ID'
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            emailID:text,
                                        })
                                    }
                                }
                                value = {this.state.emailID} 
                            ></TextInput>
                            <TextInput
                                style={styles.textInput1}
                                placeholder='Password'
                                secureTextEntry = {true}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            password:text,
                                        })
                                    }
                                }
                                
                                value = {this.state.password} 
                            ></TextInput>
                            <TextInput
                                style={styles.textInput1}
                                placeholder='Confirm Password'
                                secureTextEntry = {true}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            confirmPassword:text,
                                        })
                                    }
                                }
                                value = {this.state.confirmPassword} 
                            ></TextInput>
                            <TextInput
                                placeholder = 'Contact Number'
                                style = {styles.textInput1}
                                keyboardType='numeric'
                                onChangeText={
                                    (text)=>{
                                        this.setState({mobileNumber:text})
                                    }
                                }
                                maxLength={10}
                                value = {this.state.mobileNumber}
                            ></TextInput>
                            <TextInput
                                placeholder = 'Username'
                                style = {styles.textInput1}
                                onChangeText={
                                    (text)=>{
                                        this.setState({username:text})
                                    }
                                }
                                maxLength={15}
                                value = {this.state.username}
                            ></TextInput>
                            <TextInput
                                placeholder = 'First Name'
                                style = {styles.textInput1}
                                onChangeText={
                                    (text)=>{
                                        this.setState({firstName:text})
                                    }
                                }
                                maxLength={15}
                                value = {this.state.firstName}
                            ></TextInput>
                            <TextInput
                                placeholder = 'Last Name'
                                style = {styles.textInput1}
                                onChangeText={
                                    (text)=>{
                                        this.setState({lastName:text})
                                    }
                                }
                                maxLength={15}
                                value = {this.state.lastName}
                            ></TextInput>
                            <TextInput
                                placeholder = 'Address'
                                style = {styles.textInput1}
                                onChangeText={
                                    (text)=>{
                                        this.setState({address:text})
                                    }
                                }
                                value = {this.state.address}
                                multiline = {true}
                                numberOfLines = {8}
                            ></TextInput>
                            <TouchableOpacity
                                style = {[styles.signupButton, {marginTop:20,marginBottom:20,}]}
                                onPress={this.signup}
                            >
                                <Text style = {[styles.signupButtonText,]}>Sign me up!</Text>

                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    setAllState = ()=> {
        this.setState({
            emailID:'',
            password:'',
            confirmPassword:'',
            username:'',
            mobileNumber:'',
            address:'',
            firstName:'',
            lastName:'',
        })
    }

    signup = async ()=> {
        const email = this.state.emailID;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        const address = this.state.address;
        const mobile = this.state.mobileNumber;
        const username = this.state.username;
        const firstname = this.state.firstName;
        const lastname = this.state.lastName;
        if((email && password && confirmPassword && address && mobile && username && firstname && lastname)&&password==confirmPassword){
            try{
                const response = await firebase.auth().createUserWithEmailAndPassword(email,password)
                if(response){
                    db.collection('users').add({
                        'email' : email,
                        'password' : password,
                        'address' : address,
                        'contact' : mobile,
                        'username' : username,
                        'lastname' : lastname,
                        'firstname' : firstname,
                    })
                    Alert.alert('User added succesfully')
                    this.props.navigation.navigate('AddItem')
                }
            }
            catch(error){
                Alert.alert(error.message)
                
            }

        }
        else if(password != confirmPassword){
            Alert.alert("Password doesn't match the confirmed password")
            this.setState({password:'', confirmPassword:''})
        }
        else {
            Alert.alert('Please fill all the entries')
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
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate('AddItem')
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
        {this.showModal()}
        <Header
            backgroundColor={'#32e0c4'}
            centerComponent={{
              text: 'Goods Sale',
              style: { color: '#222831', fontSize: 20 },
            }}
        />
        <Text style = {{textAlign:'center', fontSize:12, padding:15, color:'white',}}>Good Sale for Goods</Text>
        <TextInput
            style={styles.textInput}
            keyboardType='email-address'
            placeholder='Enter your Email ID here.....'
            onChangeText={
                (text)=>{
                    this.setState({
                        emailID:text,
                    })
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
                }
            }
            value = {this.state.password} 
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
        <Text style = {{textAlign:'center', marginTop:25,color:'#eeeeee'}}>Not a user?</Text>
        <TouchableOpacity
            style={styles.button1}
            onPress={
                ()=>{
                    this.setState({
                        isModalVisible:true,
                    })
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
    textInput1:{
        marginTop:20,
        padding:10,
        alignSelf:'center',
        borderWidth:5,
        borderColor:'#32e0c4',
        width:250,
        color:"#eeeeee",
    },
    button:{
        backgroundColor:'#393e46',
        width:250,
        marginTop:25,
        alignSelf:'center',
        height:40,
    },
    button1:{
        backgroundColor:'#393e46',
        width:250,
        marginTop:5,
        alignSelf:'center',
        height:40,
    },
    signupButton:{
        backgroundColor:'#222831',
        width:100,
        marginTop:5,
        alignSelf:'center',
        height:40,
    },
    buttonText:{
        padding:10,
        color:'#eeeeee',
        alignSelf:'center',
    },
    text:{
        color:'#eeeeee'
    },
    modalContainer: {
        flex:1,
        backgroundColor:'#393e46',
        alignSelf:'center',
        width:'100%'
    },
    modalTitle:{
        backgroundColor:'#222831',
        color:'#32e0c4',
        fontSize:23,
        padding:5,
        alignContent:'center',
        textAlign:'center',
    },
    signupButtonText:{
        padding:10,
        color:'#32e0c4',
        alignSelf:'center',
    },
})

export default WelcomeScreen