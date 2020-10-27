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
        value:'',
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
                        'activeBarters' : 0,
                        'image' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOoAAADXCAMAAAAjrj0PAAAAllBMVEX39/cAev////8AcP8Acv8Adf8AeP8Ab/8Adv/9+/f//ff//vb6+fcAbf8Ae/////bq8v/1+f/v9f/N3//Y5vjy9fd+rv/U4/89jf+1z//t8vfE2f+91P8nhP+ox//f6/9hnv+Ruf+Hs/+Uu/sdgf9xp/9VmP+iwvuryfrN3vkfg/9Hkf+BsP9qo/+WvP+Mtv9Rlf/U4/ioYQczAAAL6klEQVR4nO2deZeqOBOHxSxACFwUtXGhRXFt9+//5SZo223f2wupCmDP8fnrPTPnHfpnVSqVSiVpNB48ePDgwYMHDx7Uj5SuK4RwG90rDSnyf+BKWfffZgwlUgjZiVb7eRonM4sxW+Gw4CXepNOsvx54SvGv16tUuuFon774hFLmOFxhvZL/b4cxSmwaz5e54F+rV8lsrJdpkGt80/c5SjJhSa8fuuL3qZWuFz6nFvlR5a1eSpLesPGrjKvsecoSnxaX+SZX+XO6Gnhu3RKK4YpOlhCmLfOKQ+mi371/T5ZC9o8InVe1Tu9036aVXnhg1MHpPMMdO1417ta0UpxStEFv1FJrMrhLsfJPdLRNGPRGLGPb+xMrvWhjWOhFLJkORN3ibpGicyTmhZ5h9NC9nwAlBvOyhFq5Za3VnXixdDPKShN6FkuStXcHYsU6oaUKvYid1+7FruzZxqaX72B8VK9hvWhWru++w+10UJ9hpdxWY9ILjA/rmndEJy5/lN7C7W09CzyvX+IM8wU0Dqt3YulWFI8+4rDKnVgONtU67xVOMq9SpW4nqNx5r5BdlQNWDGkNznuFxYPKtHorUqNSNWBnVQUnL/PrFJprdTqVaPWmpGal+WrnVIHWP3egNK/GrEufdO7BpjmcrEu2670oPdu1VK3e5F6U5uO1zNgklnXH3lu4E5Y2v4qRXbe8DzizsnIJd11v5vAvTlyOVBmaq9ybgqXl5P5JbRn+15CshOnVS/FVpEtDwCuUaewzf4k9NB6GRYacZjijfrDoLfvR01jxFPWXvaPlU+So4Mx0GHbXqGmGUxJPh+3mP4SjLWbbWeEkZs0quwHiz2Ekfg7/lXllvJ9hqlS0Z3S4IgYqZ6Q3/lrnhSj14WKNDlexAg9Uhx5aPwk9mzYFV+U4N5dJyAG0vsLt9JMB+jlP4L0fJ/1jSqo4Ar3L4cOiQnMmPvAXtfuGXNiFui/dFPLdG8M6sN+UO2ZcWA6AMz2Z6wlVtGcwrWxuJEH0drDoS3raSpvNFjD7JJEBs0pg8kD1bXrWCpvA+YuByVXEoG87G5BSNevAVop0iY5MwJjEuWZEemcFWv9zp4u2Ksyh7AiqtNmcg2IDmyJdWCxB8zqdwpU2mzOYC2OXOKBVB59hlDYjUCBkc5RZRQZyJqKVJP1LCppxbJRZu6DsARx9r4xBoZBhVnMubKRiYtKFHcistA03qwQFCB5jlTbHsNF6AJvV7YMciT6jpTZBeQvn4LnVgyVKPjh7eOcZNsc9A1MmuQYZ1VnglTbbIA/mL8AFjpjDgoMB/202E5BDQRc4XVgBhPxYNCvCFDShO7A0woWNF85NKG2OYL8zHUCkAldvBqaanDFsf5OuAIFJdmAVJQe2JP+bFqwa4WwAgcmFpb9qHjcitQncTiCARPgPLAZabGlGKmwlB6lGQP1XfatWqQAPdpfAXRqW1SrVItolYbEAVvRrHqsW1a70A/OHfAPFiNI2+Pu6WYQcQj+FLLZciaB7fzzQtKqAJWY5zMDCBrq0ybE7eoMVmCqdP1VjDpyjO90M4O0sdGRCKqySluPstAarHML7WcxMrMAExsqDhZZVoVlhDpuakIpoHdLLDQXcf5QDGVDaQjRu0pGOVA/Ru8OxVeAcWCX4AptoeLAMEUejjEysTwipTqoRl4AFtFeoAamIsKh+a42GF3eFOfBmG5Dax/wBVKMcjMiVcqm11YFfIRr5EiYAqy8V7soqSapOCEakhYak7jFuxTRSQ8kxUuvbyLhK1egV6GKaf41MNuA1XI5GFgyuK51hewNSwUWIs9RjcamoabXOjYwLvHjjN7wEkX/HMqEUupHx+icUjsCoDIInRqRiMkOLFJcKLYyepZrZswkxZ9L8wukSZrV6F1LtwrVgnNR7cODCmaF7wEgNjEjFREYNqbhsnxopjsI6piqWSp5MSO2h/oSqrLoyIRW34KhmrBraNkedf9aQionAFn8xoBQVgCuTamQRh4pKOvMqJlsys5MB3d294BcUmrdRon5TE4MVd28VLZwDo1Y2Rpq0RqihyoPiUlHrVXw/O2Yf7ixVY72KqkIY6BEAdwe8fr94FaLRQN5fQr45bl0EVL1Qb4dVWrhj/Qxy8u8G5K0COo3tuDqwwkeZdYK8gUKn2RtX3beQnd4h9qIjOixe3cclwTkE0eq9wV6gorNng9uJu3wOXCI9oL+tsxOHnVgtTAc/Nk7oHVaQA/Qvy7ZQqehP63XzeNC+zTfAhUNMF8QFlul08wjYobRbCFAqPkzoBGD0ivUsFXgGEP8j653ZNRCXoJ1aqK3dHP6i2WOI/m2BpW9cpSVHtyEYnRqq5BA0s27RI0f3qA0+X7LYBCIVs4V8QbcfWKJ26M+AGgVMfFb79An+fjtIMQK7zoCcAEQvbkDLG9RW4wW9vtEc4DnHD+i3tuODkkW0D2FL9KoR0BncMvDNhf75P+BB8w/oFiP2eE+CnOoE3gnxAd35Br3IyM/q6p90RLU/v6I530T4oATxX8Q9dzfYJx2pqO3jC/on4nIMVF00jz3i/Zcz4CUY+Dttter8bQPxF3hjjcA7lNbyBr+oscgJdi+EPKHDBGcaUg3kvzH0OsM/G/QyuVqpsKB0NitumzOX6lQplQdAoQr3BWlWrYn1CTteGOIOc+R8w5mv0yvQogQV88EzzRkJLgpwh9J4r9mYNpoHNnzDEXeTIfTKGkacXR90BmWcbQjglfAc/WsSPmrVNqsypx9PMH2GLZhxsddTao5WZU6ergwcKXrax5rGxV+HLIufhHYomR3Q9/q90e7vHI0r+Sn6CQl3WGgKUOYki+8u14cRHRK/mHExc+qVAms5zuxZD92r9AXh84IVMC4xcHO57Hzb2aOiEIkzI6eIvqQ17AU/qIVnv7d4Xy9wlNvSFDap6DLex9+5MnRJ8zefTzjKbV+25qLQz7T76Vdxim3NvJPhfvLkVAVu+ynRp65sIiZdEB8fA+GOclsTkyeM09mVP0j1I1MPgsiba4LV8AzmZUXbooTPR3qj1tADA2fc14VrrnNr5GwJmlY/vS6E+Ax/Ofs7Xn5rupo9D/eh85WRUqvE2mZfPFT5oTOtIQz9xHDD8RnhX1I7hJm5dtIsrYBtTD+fJvq2beiGQpPELDD/2KHXo36VCUMh5rSUZ1jdDWPGly449sRelfG4ruzOnMDIgU1TjHzaM/bq1EetY4eZOV1thiebLcp6MNmNCDvWLfCNMWVxSUIb+VuzPjVzzyaekDmzbomv1osVoSZuecMTWk6AeCeiAN7SBjwUZp4wYHxcqlKlNbsHHw4t5oSlv1fvZTY18V4ChjFTNi1dqdL6bFMTVxXCiRibVaE0T4d9ltSYS6jPz8p70fwvrUPKHK02HZPsfRaXOcv8pfVkMdKvR+mOkFRWplTlTYOE+dMahLYTamMfhNNEyh3RfnMUz5Ax2i/n1fZvEJnNeMUL2KnNglO1Nr1ojXi1ThzGlCyqC0i3uIMFoUlltbVnwsjSq0WpGrBiqT5v5NrCHwmP6metw3mviE6s/oIKisMZUYOlyjnmX6TIKPPnJYfi6IWqH7RGk14QyrWYU2bdNExtRib1mvSC9EYWJTMjDwt8xpQwexHWbtILrpwwRpJS9uf2hKr/cl2B9xNEe65icWxabGvCKQ1WbiULtqJIr7PzlWWNXAH3SrillPJl466E5iixc+Vs7GBoByBKfRUBlvLuhOZIEW4dqpI3fIRqZ7N8jK7uU2iOFN1lYlPCe5h1QKt/tCm100jcrdAzrreeMwJX214tbPV/f8kG4n6i7lco0/YXKqAQJ33WXAtEk5gonUFv7br3L/SM6w1Waf5H+8FuWSxDbg8nG0qU3wbbSP4Cg74jXdEYbhOS4ye7bDj+Mk1uP/UPC8fOfxl2zE7er9L5ihRuONrGzlmvzYI47U2W/eHwKcoZjlbZYb5IrPO/JjRYZFFX/Ba//Rcphdc9rbaLwCdfYZNktx+N3V8s8w3lzMJrdIarfS89xsnLLCdIkngxny7761AIpfL3y3xHSldJFt7Vdq7r5Rr/XyIfPHjw4MGDBw9+Mf8B8zY1hoxjiTYAAAAASUVORK5CYII='
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