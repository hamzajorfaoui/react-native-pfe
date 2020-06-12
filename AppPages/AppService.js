import axiosinstance from '../axiosconf/axiosinstance';

export function getActualites(){
    return axiosinstance.get("api/etud_actualite/byfillier")
}
export function getAnnonces(tokencancelation){
    return axiosinstance.get("api/etud_annonce/byfillier" , {
        cancelToken:tokencancelation
    })
}
export function getEmploidutemps(){
    return axiosinstance.get("api/etud_empt")
}
export function getEtudiantabsence(){
    return axiosinstance.get("api/countseances")
}
export function getEtudiantinfo(){
    return axiosinstance.get("api/etud_myprofile")
}