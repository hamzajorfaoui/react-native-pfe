import axios from "axios";
import ApiUrl from "../APIURL"
import { AsyncStorage } from "react-native";

import NavigationService from "../Services/navigationService"

//goToLogin Function on different js :
export function goToLoading(){
    NavigationService.navigate("LoadingScrenn");
}

const axiosinstance = axios.create({
    baseURL: ApiUrl
}); 
 
axiosinstance.interceptors.request.use(async (config)=>{
    const token = await AsyncStorage.getItem('Token');
    if (token != null) {
        config.headers['Authorization'] ='Bearer ' + token;
    }
    return config
}, error =>{
    Promise.reject(error)
});

axiosinstance.interceptors.response.use( reponse =>{
    return reponse
},async (error)=>{
  if(error.response.status == 401){
    const token = await AsyncStorage.getItem('Token');
    if (token != null) {
       AsyncStorage.removeItem('Token');
    }
    goToLoading();
  }
})

export default axiosinstance;
