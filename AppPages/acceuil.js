import * as React from 'react';
import { View, Text , StyleSheet} from 'react-native';



export default class Accceil extends React.Component{ 


        
    constructor(props){
        super(props);
    } 
    
    render(){
        return(
            <View style={styles.container}>
                <Text>accceil</Text>
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