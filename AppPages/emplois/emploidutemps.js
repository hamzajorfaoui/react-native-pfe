import React, { Component } from 'react'
import { View, ActivityIndicator, Text, StyleSheet} from 'react-native'
import ZoomView from '../ZoomView ';
import {getEmploidutemps} from '../AppService';
import APIURL from '../../APIURL';

export default class Emploidutemps extends Component {

    constructor(props){
    super(props);

    this.state={
        loading:true,
        empty:false,
        emploi:''
    }
    }
     
    componentDidMount(){
        getEmploidutemps().then(
            data=>{
                if(data.data.data.length > 0){
                     this.setState({emploi:APIURL+data.data.data[0].temp , loading:false})
                }else{
                    this.setState({empty:true})
                }
            }
        )
    }

    statut(){
        if (this.state.loading) {
            return  <ActivityIndicator size="large" color="#35b546" />
        } 
        if (this.state.empty) {
            return  <Text>No emploi exist</Text>
        } 
        if (!this.state.loading) {
            return   <ZoomView source={this.state.emploi}></ZoomView>
        } 
    }

    render(){
        return(
            <View style={styles.container}>
             {this.statut()}
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