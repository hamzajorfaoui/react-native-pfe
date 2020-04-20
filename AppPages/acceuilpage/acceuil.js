import * as React from 'react';
import { View, Text , StyleSheet , AsyncStorage} from 'react-native';
import  Header  from '../actualite/Header';

import { ListItem } from 'react-native-elements'
import { MaterialIcons  , MaterialCommunityIcons } from '@expo/vector-icons';

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
    
    contents = [
        {
            title:"annonces",
            icon:<MaterialIcons name="school" size={25} color="#01ae18c4" /> ,
            badge:{ value: 3, textStyle: { color: '#35b546' }, badgeStyle: styles.badge },
            navigateTo:"Annonce"
        },
        {
            title:"Emploi du Temps",
            icon:<MaterialCommunityIcons name="timetable" size={25} color="#01ae18c4" />,
            navigateTo:"Emploidutemps" 
        },
        {
            title:"Emploi d'examen",
            icon:<MaterialCommunityIcons name="calendar-text" size={25} color="#01ae18c4" />,
            
        }
    ]

    content=()=>{ 
     
        return(
            this.contents.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={  item.icon }
                badge={item.badge}
                onPress={()=>{this.props.navigation.navigate(item.navigateTo)}}
                bottomDivider
                chevron
              />
            ))
          )
    }

    render(){
        return(
                <Header content={this.content()}></Header>
        )
    }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // alignItems:"center",
    // justifyContent:"center"
    },
    header:{
        height:100,
        backgroundColor:"#35b546"
    },
    badge:{
        height:30 , 
        width:30 , 
        borderRadius:20 ,
        backgroundColor:"#fff" ,
        borderWidth:1,
        borderColor:"#35b546"
    }

})