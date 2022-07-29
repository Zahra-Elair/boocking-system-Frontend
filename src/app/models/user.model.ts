import { Departement } from "./departement.model";

export class User {
    id: number;
    nom: string;
    prenom:String;
    email: string;
    password: string;
    profile : String;
    sapid :String;
    tel : String;
    matriculeRH : String;
    idDep: Departement; 
}