import * as React from 'react';
import { View, Text , StyleSheet , Animated , ScrollView} from 'react-native';
import { Card , Button} from 'react-native-elements';
import  APIURL   from "../../APIURL";
import HeaderImage from './Header-image';

export default class Oneactualite extends React.Component{ 
           
    constructor(props){
        super(props);
        const {state} = this.props.navigation;

        this.state = {
            Actualite : state.params.actualite
        }
    } 


    
    render(){
        return(
            // <ScrollView>
            // <View style={styles.container}>
            //     <Card
            //       style={{flex:1}}
            //       title={this.state.Actualite.title}
            //       containerStyle={{margin:0, marginTop:10}}
            //       imageStyle={{ height:250 , borderBottomWidth:1, borderTopWidth:1 , borderColor:'#35b546'}}
            //       imageProps = {{ resizeMode:'contain' }}
            //       image={{uri:APIURL+this.state.Actualite.req_image}}>
            //     <Text style={{marginBottom: 10}}>
            //     {this.state.Actualite.contenu}
            //     </Text>
            //     </Card>
            // </View>  
            // </ScrollView>
            <HeaderImage Actualite={this.state.Actualite}></HeaderImage>
            
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // alignItems:"center",
        // justifyContent:"center"
    }
})