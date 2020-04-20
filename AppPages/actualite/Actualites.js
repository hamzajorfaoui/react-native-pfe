import * as React from 'react';
import { View, Text , StyleSheet , ScrollView , ActivityIndicator, RefreshControl} from 'react-native';
import { Card , Button} from 'react-native-elements';
import {getActualites} from '../AppService';
import  APIURL   from "../../APIURL";

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
    if(data.status === 200){ 
         this.setState({list:data.data.data} , ()=>{this.setState({loading:false})});
    }
   
    }) 
    .catch(er=>{throw er})
    .then();
   }
   waitingfordata = ()=>{
    if(this.state.loading == true){
        return <ActivityIndicator size="large" color="#fff" style={styles.spin}></ActivityIndicator>
    }else{
        return this.getListItems(9)
    }
   }


    getListItems = () => {  
        const items = [];
    
        for (let i=0 ; i < this.state.list.length ; i++){
          items.push(
            <Card
            key={i} 
            // title='HELLO WORLD'
            containerStyle={{margin:0, marginTop:2}}
            imageStyle={{ height:250 , borderBottomWidth:1 , borderColor:'#35b546'}}
            imageProps = {{ resizeMode:'contain' }}
            image={{uri:APIURL+this.state.list[i].req_image 
            // , cache: 'only-if-cached'
            }}>
            <Text style={{marginBottom: 10 , color:'#006f0f' , fontWeight:"bold"}}> 
            {this.state.list[i].title} 
            </Text> 
            {
               this.state.list[i].is_active == 1 ? <Button 
               titleStyle={{color:'#35b546'}}
               iconRight={true}
               buttonStyle={{borderColor:"#35b546" , backgroundColor:'#fff' ,justifyContent:'flex-end'}}
               title='Detail...' 
               onPress={()=>{this.props.navigation.navigate('Oneactualite',{actualite:this.state.list[i]})}}
               /> 
               : <Text style={styles.textannule}>Annulé</Text>
            }
            </Card>    
          );
        }
        // this.setState({list:items});   
        return items;

      };
    render(){
        return( 
                // <Header getlist={this.getListItems(9)}></Header>
                // <>
                // {this.waitingfordata()}
                // </>

            <View style={styles.container}>
                        
            <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                tintColor="#fff"
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({ refreshing: true });
                    setTimeout(() => this.setState({ refreshing: false }), 1000);
                }}
                // Android offset for RefreshControl
                progressViewOffset={0}
                />
            }
            contentInset={{
                top: 0,
            }}
            contentOffset={{
                y: -0,
            }}
            >
            <View style={styles.content}>
            {this.waitingfordata()}
            </View>
            </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#35b546',
      },
    spin:{ 
       marginTop:30 
    },
    textannule:{
        marginLeft: 'auto',
        fontWeight:"bold",
        fontSize:20,
        color:"#e50914"
    }
})