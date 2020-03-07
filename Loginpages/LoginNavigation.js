import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Choose from './Choose';
import LoginS from './LoginS';


const Stack = createStackNavigator(); 

function LoginStudent(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Choose" 
                    component={Choose}
                    options={{ headerShown:false }}></Stack.Screen>
      <Stack.Screen name="LoginS"
                    component={LoginS}
                    options={{ headerShown:true,
                               headerTitle:"Login",
                               headerBackTitle:"Back",
                               headerTintColor:"#fff",
                               headerStyle:{backgroundColor:"#35b546" , borderBottomColor:"#35b546"} }}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default function Login(){
  return(
    <NavigationContainer>

      <LoginStudent/>

    </NavigationContainer>
  )
}
