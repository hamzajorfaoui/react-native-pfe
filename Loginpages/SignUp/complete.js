
import * as React from 'react';
import { Button  , Text , Avatar , Input  } from 'react-native-elements';
import { View , StyleSheet} from 'react-native';


export function Complete(props){
    function Progress(number){
     let prog=[];
     for (let index = 0; index < 4; index++) {
         if(index < number){
            prog.push(<View key={index} style={styles.progV}></View>); 
         }else{
            prog.push(<View key={index} style={styles.prog}></View>); 
         }
         
     }
     return prog
    }

    return(
        <>
    <View style={styles.container1}>
        <View style={styles.container}>

            <View style={styles.lign1}>
            <Text style={styles.CC}>{(props.comp-1)*25}% :</Text> 
             <Text  style={styles.gris}>Complete</Text>   
            </View>

            <View style={styles.lign2}>
             <Text style={styles.CC}>Sign Up</Text>   
            </View>

            <View style={styles.lign1}> 
             {Progress(props.comp)}
            </View>
        </View>

        <View style={styles.lign4}>
        <Text style={styles.black}>{props.title}</Text>
        <Text style={styles.gris1}>{props.subtitle}</Text>   
        </View>

    </View>
       </>
    )

}

const styles = StyleSheet.create({
    container1:{
        backgroundColor:"#35b546"
    },
    container:{
     flex:1,
     padding:20,
     backgroundColor:"#35b546"
    },
    lign1:{
    flexDirection:'row',
    alignItems:'center'
    },
    lign2:{

    },
    lign3:{

    },
    lign4:{
    backgroundColor:"#fff",
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    padding:20
    },
    gris:{
        color:"#eeeeee",
        fontSize:20
    },
    CC:{
        color:"#f8f8f8de",
        fontWeight:'bold',
        fontSize:20 
    },
    black:{
        fontWeight:'bold',
        fontSize:15 
    },
    gris1:{
    color:"#c5c5c5"
    },
    prog:{
        borderRadius:20 ,
        marginTop:20,
        width:'20%',
        height:8,
        backgroundColor:'white',
        opacity:0.2,
        marginRight:'5%'
    },
    progV:{
        borderRadius:20 ,
        marginTop:20,
        width:'20%',
        height:8,
        backgroundColor:'white',
        opacity:0.9,
        marginRight:'5%'
    }

})