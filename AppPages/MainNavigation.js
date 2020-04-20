import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Accceil from "./acceuilpage/acceuil";
import Actualites from './actualite/Actualites';
import Profile from './profile/Profile';
import Oneactualite from './actualite/Oneactualite';
import Annonce from './annonce/annonce';
import Emploidutemps from './emplois/emploidutemps';

const routes_without_bottom_bar = ["Oneactualite", "Annonce"]; 
const routesP_without_bottom_bar = ["Acceuil", "Actualites"]; 
const activebottom =(n)=>{
    // let test = (n)=>{
        return routes_without_bottom_bar.indexOf(n.state.routes[n.state.index].routeName) != -1 ? false : true
//     }
//     console.log(nav.state)
// return routesP_without_bottom_bar.indexOf(nav.state.routeName) != -1 ? true : test(nav)
}
const Actualitesnavigation = createStackNavigator(
    {
        ActualitesA:{
            screen:Actualites,
            navigationOptions:{headerTitle:"Actualites", headerBackTitle:"back" }
        },
        Oneactualite:{
            screen:Oneactualite,
            navigationOptions:{headerShown:false}
        }
    },
    {
        defaultNavigationOptions:{
        headerTintColor:"#fff",
        headerStyle:{backgroundColor:"#35b546" , borderBottomColor:"#35b546"}
    }
    }
);
const Accceilnavigation = createStackNavigator(
    {
        Acceuil:{
            screen:Accceil,
            navigationOptions:{headerShown:false}
        },
        Annonce:{
            screen:Annonce,
            navigationOptions:{headerTitle:"Annonces", headerBackTitle:"back"}
        },
        Emploidutemps:{
            screen:Emploidutemps,
            navigationOptions:{headerTitle:"Emploidutemps", headerBackTitle:"back"}
        }
    },
    {
        defaultNavigationOptions:{
        headerTintColor:"#fff",
        headerStyle:{backgroundColor:"#35b546" , borderBottomColor:"#35b546"}
    }
}
);
const Profilenavigation = createStackNavigator(
    {
        
        Profile:{
            screen:Profile,
            navigationOptions:{headerTitle:"Profile", headerBackTitle:"back"}
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
            screen:Accceilnavigation,
            // navigationOptions:{tabBarVisible:false}
        },
        Actualites:{
            screen:Actualitesnavigation,
            // navigationOptions:{tabBarVisible:false}
        },
        Profile:{
            screen:Profilenavigation,
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
