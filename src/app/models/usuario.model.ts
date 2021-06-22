import { environment } from "src/environments/environment";

const base_url = environment.URL_BASE

export class Usuario {
    
    constructor(
            public id_usuario?: number,
            public dni?: string, 
            public nombre?: string, 
            public apellido?: string, 
            public correo?: string, 
            public clave?: string,
            public role?: string,
            public img?: string,
            public destino_id?:number,
            public fecha_alta?: Date,
            public fecha_baja?: Date,
            public ultima_actualizacion?: Date
            
    ){
        if(!this.clave){
            this.clave = "";
        }
    }


    get fotoUrl(){
        if(this.img){
            return `${base_url}/usuarios/foto?foto_nombre=${this.img}`;
        }else{
            return `${base_url}/usuarios/foto?foto_nombre=no-image.jpg`;
        }
    }






}