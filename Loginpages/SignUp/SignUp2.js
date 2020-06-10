import * as React from 'react';
import { Button  , Text , Input} from 'react-native-elements';
import { View , StyleSheet, Image } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Complete } from './complete';
import { MaterialIcons  , Ionicons , AntDesign} from '@expo/vector-icons';

import { EmailStudent } from "../loginservice";
const InputCustom = props=> <Input
                            {...props}
                            labelStyle={{color:"#01ae18"}}
                            containerStyle={{marginTop:20}}/>
export const valideemail = (text) => {  
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(text) === false) {
        return false;
      }
      else {
        return true;
      }
}
export default class SignUp2 extends React.Component{

    constructor(props){
     super(props);
     const {state} = props.navigation;
     this.state={
        loading:false,
        errorMessage:"",
        etudiantid:state.params.etudiantid,
        email:''
     }
    }
    componentDidUpdate(prevProps , prevState){
        if(prevState.email != this.state.email){
            this.setState({errorMessage:""});
        }
        }
    confirmemailS(){
        if(this.state.email && valideemail(this.state.email)){
            this.setState({loading:true})

            EmailStudent(this.state.email , this.state.etudiantid).then(
            data=>{
                if(data.data == "email verfication sended"){
                    this.props.navigation.navigate('Sign Up 3' , {email:this.state.email , etudiantid:this.state.etudiantid});
                }else{
                    console.log(data.data);
                    this.setState({errorMessage:"this email already exist"})
                }
                this.setState({loading:false})

            }
            ).catch(e=>{
                this.setState({loading:false});
                console.log(e)
            })
        }

        if(!valideemail(this.state.email)){
            this.setState({errorMessage:"This Email is invalid !!"})
        }
        
    }


    render(){
        return(
        <KeyboardAvoidingScrollView extraScrollHeight={16}   style={styles.container} >
            <Complete comp={2} title="Enter Your Personnal Email :" subtitle="" ></Complete>
            <InputCustom 
                        errorMessage={ this.state.errorMessage}
                        onChange={(e)=>{this.setState({email:e.nativeEvent.text})}}
                        label="Email"
                        placeholder='EX : adress@gamil.com'
                        leftIcon={ <MaterialIcons name="email" size={32} color="#01ae18c4" style={{marginLeft:-10 , width:40}} />}></InputCustom>
            <View style={{alignItems:'flex-end'}}>
            <Button
            disabled={this.state.loading}
            loading={this.state.loading}
            style={{marginTop:100,marginRight:10}}
            buttonStyle={{borderColor:"#35b546" , width:70, backgroundColor:'#35b546', padding:0}}
            icon={
                <AntDesign
                name="arrowright"
                size={40}
                color="white"
                />
            }
            onPress={()=>{this.confirmemailS()}}
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