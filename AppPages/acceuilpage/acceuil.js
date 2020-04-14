import * as React from 'react';
import { View, Text , StyleSheet , AsyncStorage} from 'react-native';

export default class Accceil extends React.Component{ 


        
    constructor(props){ 
        super(props);
        // this.remove()
        this.state={
            list:[],
            haha:"ok"
        }
    } 

    remove = async ()=>{
        await   AsyncStorage.removeItem("Token");

        this.props.navigation.navigate("LoadingScrenn")
    }

    render(){
        return(
                <View style={styles.container}><Text>Acceuil</Text></View>
        )
    }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
},
})