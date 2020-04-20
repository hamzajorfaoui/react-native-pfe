import axiosinstance from '../axiosconf/axiosinstance';

export function getActualites(){
    return axiosinstance.get("api/etud_actualite/byfillier")
}
export function getAnnonces(){
    return axiosinstance.get("api/etud_annonce/byfillier")
}
export function getEmploidutemps(){
    return axiosinstance.get("api/etud_empt")
}