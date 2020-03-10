

import  APIURL  from "../APIURL";
import axios from 'axios';

export function LoginStudent(email , password){

   return axios.post(APIURL+"/api/etudiant/login", {email:email , password:password})

}
export function SignUpS(email , password){

    return axios.post(APIURL+"/api/etudiant/login", {email:email , password:password})
}
export function EmailStudent(email , id){

    return axios.post(APIURL+"/api/etudiant/sendcodetoemail", {email:email , id:id})
              
}
export function Codeverification( id , code){

    return axios.post(APIURL+"/api/etudiant/verfiyemail", {code:code , id:id})
              
}
export function passwordconfirm( id , email , password){

    return axios.post(APIURL+"/api/etudiant/upetudiant", {email:email , id:id , password:password})
              
}