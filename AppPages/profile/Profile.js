import * as React from 'react';
import { View, Text , StyleSheet , AsyncStorage} from 'react-native';



export default class Profile extends React.Component{ 


        
    constructor(props){
        super(props);
        // this.remove()
    } 


    
    render(){
        return(
            <View style={styles.container}>
                <Text>Profile</Text>
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