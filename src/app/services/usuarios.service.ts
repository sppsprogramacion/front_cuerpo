import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';


interface ILoginData {
  'correo': string,
  'clave' : string,
  'recuerdame': boolean
}


const base_url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
    ) { }
    
  crearUsuario(dataForm: any){
    if(dataForm.clave2){
      delete dataForm.clave2;
    }
    delete dataForm.role;
    let nuevo: Usuario = new Usuario();
    nuevo = {...dataForm};
  console.log('ESTOS SON LOS DATOS QUE SERAN ENVIADOS A LA PETICION HTTP', nuevo);

    return this.http.post(`${base_url}/usuarios`, nuevo);
    
  }

  login(dataLogin: ILoginData ){
   // delete dataLogin.recuerdame;
   
    return this.http.post(`${base_url}/auth/login`, dataLogin);    
  }

  getUsuarios(){
    return this.http.get<[usuarios: Usuario[], total: number]>(`${base_url}/usuarios`);
  }

  editUsuario(id: number, data: Partial<Usuario>){
    return this.http.put(`${base_url}/usuarios/${id}`, data);
  }
}
