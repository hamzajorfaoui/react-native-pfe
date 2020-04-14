import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Accceil from "./acceuilpage/acceuil";
import Actualites from './actualite/Actualites';
import Profile from './profile/Profile';
import Oneactualite from './actualite/Oneactualite';

const activebottom =(nav)=>{
    let test = (n)=>{
        return n.state.routes[n.state.index].routeName == "Oneactualite" ? false : true
    }
return nav.state.routeName != "Actualites" ? true : test(nav)
}
const Actualitesnavigation = createStackNavigator(
    {
        ActualitesA:{
            screen:Actualites,
            navigationOptions:{headerShown:false}
        },
        Oneactualite:{
            screen:Oneactualite,
            navigationOptions:{headerTitle:"Actualite",headerShown:false, headerBackTitle:"back"}
        }
    },
    {
        defaultNavigationOptions:{
        headerTintColor:"#fff",
        headerStyle:{backgroundColor:"#35b546" , borderBottomColor:"#35b546"}
    }
    }
)
const Bottomnavigation = createBottomTabNavigator(
    {
        Acceuil:{
            screen:Accceil,
            // navigationOptions:{tabBarVisible:false}
        },
        Actualites:{
            screen:Actualitesnavigation,
            // navigationOptions:{tabBarVisible:false}
        },
        Profile:{
            screen:Profile,
            // navigationOptions:{tabBarVisible:false}
        },


    },{
        defaultNavigationOptions:({navigation})=>({
         tabBarVisible:activebottom(navigation),
         tabBarIcon:({focused, horizontal, tintColor})=>{
         const {routeName} = navigation.state;
         let IconComponent = Ionicons;
         let iconName;
         if(routeName === 'Acceuil'){
            iconName = focused ? 'ios-home' : 'md-home';

         }else if(routeName === 'Actualites'){
            iconName = focused ? 'ios-paper' : 'md-paper';   
         }else if(routeName === 'Profile'){
            iconName = focused ? 'ios-person' : 'md-person';   
         }
         return <IconComponent name={iconName} size={25} color={tintColor} />;
         }
        }),
        tabBarOptions:{
            activeTintColor:'#35b546',
            inactiveTintColor:'gray'
        }
    }
    
);

export default Bottomnavigation;
