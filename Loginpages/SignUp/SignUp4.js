import * as React from 'react';
import { Button  , Text , Input} from 'react-native-elements';
import { View , StyleSheet, Image ,AsyncStorage} from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Complete } from './complete';
import { Ionicons , AntDesign} from '@expo/vector-icons';

import { passwordconfirm } from "../loginservice";

const InputCustom = props=> <Input
                            {...props}
                            labelStyle={{color:"#01ae18"}}
                            containerStyle={{marginTop:20}}/>
export default class SignUp4 extends React.Component{

    constructor(props){
     super(props);
     const {state} = props.navigation;
     this.state={
        etudiantid:state.params.etudiantid,
        email:state.params.email,
        password:'',
        confpass:'',
        loading:false,
        errorMessage:""
     }
    }
    confirmpasswoard(){
        
    if(this.state.password && this.state.password == this.state.confpass){
        this.setState({loading:true})
      passwordconfirm(this.state.etudiantid , this.state.email , this.state.password).then(
          data=>{
              console.log(data.data);
              AsyncStorage.setItem("Token",data.data.access_token).then(
                data=>{
                     this.setState({loading:false});
                     this.props.navigation.navigate("LoadingScrenn");
                }
            )
          }
      ).catch(e=>{
        this.setState({loading:false});
      })
    }
    if(this.state.password == ""){
    this.setState({errorMessage:"Password is Required !!"});
    }
    if(this.state.password != this.state.confpass){
    this.setState({errorMessage:"password must be equal to Confirm Password !!"});     
    }

    }


    render(){
        return(
        <KeyboardAvoidingScrollView extraScrollHeight={16}   style={styles.container}>
            <Complete comp={4} title="Enter Yout accout Infotmations :" subtitle="That the school gives you" ></Complete>
            <InputCustom secureTextEntry={true}
                        onChange={(e)=>{this.setState({password:e.nativeEvent.text})}}
                        label="Password"
                        placeholder='password'  
                        errorMessage={ this.state.errorMessage}
                        leftIcon={ <Ionicons name="ios-lock" size={32} color="#01ae18c4" style={{marginLeft:-5 , width:35}} />}></InputCustom>
            <InputCustom 
                        secureTextEntry={true}
                        onChange={(e)=>{this.setState({confpass:e.nativeEvent.text})}}
                        label="Confirm Password"
                        // placeholder='CNE@ests.com'
                        leftIcon={ <Ionicons name="ios-lock" size={32} color="#01ae18c4" style={{marginLeft:-5 , width:35}} />}></InputCustom>
            <View style={{alignItems:'flex-end'}}>
            <Button
             disabled={this.state.loading}
             loading={this.state.loading}
            style={{marginTop:20,marginRight:10}}
            buttonStyle={{borderColor:"#35b546" , width:70, backgroundColor:'#35b546', padding:0}}
            icon={
                <AntDesign
                name="arrowright"
                size={40}
                color="white"
                />
            }
            onPress={()=>{this.confirmpasswoard()}}
            />     
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