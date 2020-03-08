import * as React from 'react';
import { Button  , Text } from 'react-native-elements';
import { View , StyleSheet, Image } from 'react-native';

export default class Choose extends React.Component{

    constructor(props){
     super(props);
    }


  render(){
    return(
        <View style={styles.container}>
          <View style={styles.Title}>
            <Text h2 style={{color:"#fff"}}>Welcome</Text>
          </View>
          <View style={styles.choose}>
          <Text h4 style={styles.areyou}>So are you :</Text>
            <Button
            buttonStyle={{
              margin:10,
              borderColor:'#35b546'
           }}
            icon={
              <>
              <View style={{alignItems:'center'}}>
                <Image style={{
                              width:250,
                              height:125
                            }} 
                        source={{uri: 'data:image/png;base64,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'}}
               />
                <Text h4 style={{color:'#35b546'}}>Student</Text>
              </View>
              </>
            }
            type="outline"
            onPress={()=>{this.props.navigation.navigate('LoginS')}}
            />
            <Button
            buttonStyle={{
              margin:10,
              borderColor:'#35b546'
           }}
            icon={
              <>
              <View style={{alignItems:'center'}}>
                  <Image style={{
                                width:250,
                                height:125
                              }} 
                          source={{uri: 'data:image/png;base64,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'}}
                   />
                  <Text h4 style={{color:'#35b546'}}>Professeur</Text>
              </View>
              </>
            }
            type="outline"
          />
          </View>
        </View>
        ) 
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#35b546',
    //   alignItems: 'center',
      // justifyContent: 'center',
    },
    Title:{
      backgroundColor:'#35b546',
      flex:0.5,
      flexDirection:'column',
      justifyContent: 'space-between',
      paddingTop:50,
      paddingLeft:10 
    },
    areyou:{
      marginLeft:10,
      color:'#35b546',
    },
    choose:{
      backgroundColor:'#fff',
      borderTopLeftRadius: 30, 
      borderTopRightRadius: 30,
      flex:3,
      paddingTop:20
    }
  });