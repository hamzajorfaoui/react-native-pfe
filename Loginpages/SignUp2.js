import * as React from 'react';
import { Button  , Text , Input} from 'react-native-elements';
import { View , StyleSheet, Image } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Complete } from './complete';
import { MaterialIcons  , Ionicons , AntDesign} from '@expo/vector-icons';

const InputCustom = props=> <Input
                            {...props}
                            labelStyle={{color:"#01ae18"}}
                            containerStyle={{marginTop:20}}/>
export default class SignUp2 extends React.Component{

    constructor(props){
     super(props);
    }

    render(){
        return(
        <KeyboardAvoidingScrollView extraScrollHeight={16}   style={styles.container}>
            <Complete comp={2} title="Enter Your Personnal Email :" subtitle="" ></Complete>
            <InputCustom 
                        label="Email"
                        placeholder='EX : adress@gamil.com'
                        leftIcon={ <MaterialIcons name="email" size={32} color="#01ae18c4" style={{marginLeft:-10 , width:40}} />}></InputCustom>
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
            onPress={()=>{this.props.navigation.navigate('Sign Up 3')}}
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