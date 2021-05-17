import { environment } from "src/environments/environment";

const base_url = environment.URL_BASE

export class Usuario {
    
    constructor(
            public dni: string, 
            public nombre: string, 
            public apellido: string, 
            public correo: string, 
            public clave: string,
            public role?: string,
            public img?: string,
            
    ){}


    get fotoUrl(){
        if(this.img){
            return `${base_url}/usuarios/foto/${this.img}`;
        }else{
            return `${base_url}/usuarios/foto/no-image.jpg`;
        }
    }






}