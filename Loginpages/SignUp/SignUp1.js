import * as React from 'react';
import { Button  , Text , Input} from 'react-native-elements';
import { View , StyleSheet, Image } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Complete } from './complete';
import { MaterialIcons  , Ionicons , AntDesign} from '@expo/vector-icons';

import {SignUpS} from "../loginservice";
const InputCustom = props=> <Input
                            {...props}
                            labelStyle={{color:"#01ae18"}}
                            containerStyle={{marginTop:20}}/>
                            
export default class SignUp1 extends React.Component{

    constructor(props){
     super(props);
     this.state={
         email:'',
         password:'',
         loading:false,
         errorMessage:"" , 
         passwordMessage:"",
         change:false
     }
    this.pwdfield = React.createRef();
    }

    componentDidUpdate(prevProps , prevState){
    if(prevState.email != this.state.email || prevState.password != this.state.password ){
        this.setState({errorMessage:"" , passwordMessage:""});
    }
    }
    SignUp=()=>{
        if(this.state.email.endsWith("@ests.com") && this.state.password){
            this.setState({loading:true});
            SignUpS(this.state.email , this.state.password).then(
                data=>{
                    console.log(data.data.etudiant);
                    this.setState({loading:false});
                    this.props.navigation.navigate('Sign Up 2',{etudiantid:data.data.etudiant.id}); 
                }
            ).catch(e=>{
                console.log(e.statut);
                this.setState({loading:false , errorMessage:"Email or password is incorrect !!"});
            })
        }

        if(!this.state.email.endsWith("@ests.com")){
            this.setState({ errorMessage:"This Email is invalid !!"});
        }
        if(this.state.password == ""){
            this.setState({ passwordMessage:"password is required !!"});
        } 
        if(this.state.email == ""){
            this.setState({ errorMessage:"email is required !!"});
        }  
    }

    render(){
       
        return(
        <KeyboardAvoidingScrollView extraScrollHeight={50} style={styles.container}>
            <View >
            <Complete comp={1} title="Confirm Your account password :" subtitle="" ></Complete>
            <InputCustom 
                        onChange={(e)=>{this.setState({email:e.nativeEvent.text})}}
                        label="Email"
                        autoFocus={true} 
                        returnKeyType="next"
                        onSubmitEditing={(e)=>{this.pwdfield.current.focus()}} 
                        placeholder='CNE@ests.com'
                        errorMessage={ this.state.errorMessage}
                        leftIcon={ <MaterialIcons name="email" size={32} color="#01ae18c4" style={{marginLeft:-10 , width:40}} />}></InputCustom>

            <Input      ref={this.pwdfield}
                        secureTextEntry={true}
                        onChange={(e)=>{this.setState({password:e.nativeEvent.text})}}
                        label="Password"
                        placeholder='password'
                        labelStyle={{color:"#01ae18"}}
                        containerStyle={{marginTop:20}}
                        errorMessage={ this.state.passwordMessage}
                        leftIcon={ <Ionicons name="ios-lock" size={32} color="#01ae18c4" style={{marginLeft:-5 , width:35}} />}/>
            <View style={{alignItems:'flex-end'}}>
            <Button
            disabled={this.state.loading}
            loading={this.state.loading}
            loadingStyle={{height:40}}
            style={{marginTop:20,marginRight:10}}
            buttonStyle={{borderColor:"#35b546" , width:70, backgroundColor:'#35b546', padding:0}}
            icon={
                <AntDesign
                name="arrowright"
                size={40}
                color="white"
                />
            }
            onPress={()=>{this.SignUp()}}
            />     
            </View>
                       
            </View>
        </KeyboardAvoidingScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
  });