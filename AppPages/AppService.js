import axiosinstance from '../axiosconf/axiosinstance';

export function getActualites(){
    return axiosinstance.get("api/etud_actualite/byfillier")
}