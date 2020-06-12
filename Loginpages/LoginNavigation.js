import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import Choose from './Choose';
import LoginS from './Login/LoginS';
import SignUp1 from './SignUp/SignUp1';
import SignUp2 from './SignUp/SignUp2';
import SignUp3 from './SignUp/SignUp3';
import SignUp4 from './SignUp/SignUp4';
import Loading from "../Loading";

import Bottomnavigation from "../AppPages/MainNavigation";

const LoginStack = createStackNavigator({

  Choose:{
    screen:Choose,
    navigationOptions:{headerShown:false}
  },  
  LoginS:{
    screen:LoginS,
    navigationOptions:{headerShown:true,
      headerTitle:"Login",
      headerBackTitle:"Back"}
  },
  "Sign Up":{
    screen:SignUp1,
    navigationOptions:{headerTitle:"Sign Up"}
  },
  "Sign Up 2":{
    screen:SignUp2,
    navigationOptions:{headerTitle:"Sign Up" , headerLeft:()=><></> , gestureEnabled:false}
  },
  "Sign Up 3":{
    screen:SignUp3,
    navigationOptions:{headerTitle:"Sign Up" , headerLeft:()=><></>, gestureEnabled:false}
  },
  "Sign Up 4":{
    screen:SignUp4,
    navigationOptions:{headerTitle:"Sign Up" , headerLeft:<></> , gestureEnabled:false}
  },
},{
  defaultNavigationOptions:{
    headerTintColor:"#fff",
    headerStyle:{backgroundColor:"#35b546" , borderBottomColor:"#35b546"}
  }
}); 

export default Approute = createAppContainer(
  createSwitchNavigator(
    {
      Authentification:LoginStack,  
    LoadingScrenn:Loading,
    APP:Bottomnavigation
  },
    {
      initialRouteName: 'LoadingScrenn', 
    }
  )
)
