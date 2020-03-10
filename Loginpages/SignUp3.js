import * as React from 'react';
import { Button  , Text , Input} from 'react-native-elements';
import { View , StyleSheet, Image } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Complete } from './complete';
import {  AntDesign} from '@expo/vector-icons';
import CodeInput from 'react-native-confirmation-code-input';

import { Codeverification } from "./loginservice";

export default class SignUp3 extends React.Component{

    constructor(props){
     super(props);
     const {state} = props.navigation;
     this.state={
        etudiantid:state.params.etudiantid,
        email:state.params.email
     }

    }

    verifycode(code){
        Codeverification(this.state.etudiantid , code).then(
            data=>{
                console.log(data.data);
                if(data.data.is_verfied == true){
                    this.props.navigation.navigate('Sign Up 4' , {email:this.state.email , etudiantid:this.state.etudiantid});

                }else{

                }
            }
        )
    }

    render(){
        return(
        <KeyboardAvoidingScrollView extraScrollHeight={16}   style={styles.container}>
            <Complete comp={3} title="Email Verification :" subtitle={"Please Enter the Verification Code send to : "+this.state.email} ></Complete>
            <CodeInput
            className={'border-b'}
            ref="codeInputRef1"
            activeColor='#35b546'
            inactiveColor='rgba(49, 180, 4, 1.3)'
            space={5}
            size={40}
            autoFocus={true}
            // keyboardType="numeric"
            inputPosition='center'
            // onChange={()=>{console.log("rd")}}
            onFulfill={(code) => this.verifycode(code)}
            />

            <View style={{alignItems:'flex-end'}}>
            <Button
            style={{marginTop:100,marginRight:10}}
            buttonStyle={{borderColor:"#35b546" , width:70, backgroundColor:'#35b546', padding:0}}
            icon={
                <AntDesign
                name="arrowright"
                size={40}
                color="white"
                />
            }
            onPress={()=>{this.props.navigation.navigate('Sign Up 4')}}
            
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