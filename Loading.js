import React, { Component } from 'react';
import { View , StyleSheet, Text  , ActivityIndicator , AsyncStorage} from 'react-native';
import {getEtudiantinfo, getEtudiantabsence} from './AppPages/AppService';


export default class Loading extends Component{
    
    constructor(props){
        super(props);
        this.CheckLogin();
    } 

    CheckLogin = async ()=>{
        try {
            const value = await AsyncStorage.getItem('Token');
            if (value == null) {
                this.props.navigation.navigate('Authentification');
            }else{
                const user = await AsyncStorage.getItem('user');
                if(user == null){
                getEtudiantinfo().then(data=>{  
                   AsyncStorage.setItem("user",JSON.stringify(data.data.data[0]));
                   this.props.navigation.navigate('APP');  
                });
                }else{ 
                  this.props.navigation.navigate('APP');   
                }

            } 
          } catch (error) {
            // Error retrieving data
          }
    }

    render(){
        return(
            <View style={styles.container}>
                 <ActivityIndicator size="large" color="#35b546" />
                 <Text style={{color:"#35b546"}}>veuillez patienter...</Text>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})