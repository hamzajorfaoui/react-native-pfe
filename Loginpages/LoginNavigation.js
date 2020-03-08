import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Choose from './Choose';
import LoginS from './LoginS';
import SignUp1 from './SignUp1';
import SignUp2 from './SignUp2';
import SignUp3 from './SignUp3';
import SignUp4 from './SignUp4';


const Stack = createStackNavigator(); 

function LoginStudent(){
  return(
    <Stack.Navigator screenOptions={{headerTintColor:"#fff",
                                     headerStyle:{backgroundColor:"#35b546" , borderBottomColor:"#35b546"}}}>
      <Stack.Screen name="Choose" 
                    component={Choose}
                    options={{ headerShown:false }}></Stack.Screen>
      <Stack.Screen name="LoginS"
                    component={LoginS}
                    options={{ headerShown:true,
                               headerTitle:"Login",
                               headerBackTitle:"Back",
                                }}></Stack.Screen>
     <Stack.Screen name="Sign Up" 
                    component={SignUp1}
                    options={{  }}></Stack.Screen>
     <Stack.Screen name="Sign Up 2" 
                    component={SignUp2}
                    options={{ headerTitle:"Sign Up" }}>
      </Stack.Screen>
      <Stack.Screen name="Sign Up 3" 
                    component={SignUp3}
                    options={{ headerTitle:"Sign Up" }}></Stack.Screen>
      <Stack.Screen name="Sign Up 4" 
                    component={SignUp4}
                    options={{ headerTitle:"Sign Up" }}></Stack.Screen>
                    
    </Stack.Navigator>
  )
}
function SingUpStudent(){
  return(
    
      <Stack.Screen name="SignUp1" 
                    component={SignUp1}
                    options={{ headerShown:false }}></Stack.Screen>

  )
}

export default function Login(){
  return(
    <NavigationContainer>

      <LoginStudent/>
      {/* <SingUpStudent/> */}
    </NavigationContainer>
  )
}
