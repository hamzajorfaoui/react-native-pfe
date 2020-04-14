import * as React from 'react';
import { View, Text , StyleSheet , AsyncStorage , ActivityIndicator} from 'react-native';
import Header from "./Header";
import { Card , Button} from 'react-native-elements';
import {getActualites} from '../AppService';
import  APIURL   from "../../APIURL";
import HeaderA from './Header1';

export default class Actualites extends React.Component{ 


        
    constructor(props){
        super(props);
        // this.remove()
        this.state={
            list:[],
            loading:true,
        }
        
    } 
    
  componentDidMount(){
      this.LoadData();
  }
   LoadData = ()=>{
    getActualites().then(data=>{
    this.setState({list:data.data.data} , 
              ()=>{this.setState({loading:false})});
    }) 
    .catch(er=>{throw er})
    .then();
   }
   waitingfordata = ()=>{
    if(this.state.loading == true){
        return <ActivityIndicator size="large" color="#35b546" style={styles.spin}></ActivityIndicator>
    }else{
        return <HeaderA getlist={this.getListItems(9)}></HeaderA>
    }
   }


    getListItems = () => {  
        const items = [];
    
        for (let i=0 ; i < this.state.list.length ; i++){
          items.push(
            <Card
            key={i} 
            // title='HELLO WORLD'
            containerStyle={{margin:0, marginTop:5}}
            imageStyle={{ height:250 , borderBottomWidth:1 , borderColor:'#35b546'}}
            imageProps = {{ resizeMode:'contain' }}
            image={{uri:APIURL+this.state.list[i].req_image}}>
            <Text style={{marginBottom: 10 , color:'#006f0f' , fontWeight:"bold"}}> 
            {this.state.list[i].title} 
            </Text> 
            <Button 
                titleStyle={{color:'#35b546'}}
                iconRight={true}
                buttonStyle={{borderColor:"#35b546" , backgroundColor:'#fff' ,justifyContent:'flex-end'}}
                title='Detail...' 
                onPress={()=>{this.props.navigation.navigate('Oneactualite',{actualite:this.state.list[i]})}}
                />
            </Card>   
          );
        }
        // this.setState({list:items});   
        return items;

      };
    render(){
        return( 
                // <Header getlist={this.getListItems(9)}></Header>
                <>
                {this.waitingfordata()}
                </>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    spin:{
       marginTop:30 
    }
})