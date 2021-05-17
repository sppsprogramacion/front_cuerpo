import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRegisterForm } from '../interfaces/register-form.interface';

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
    delete dataForm.clave2;
  
    return this.http.post(`${base_url}/usuarios`, dataForm);
    
  }

  login(dataLogin: ILoginData ){
   // delete dataLogin.recuerdame;
   
    return this.http.post(`${base_url}/auth/login`, dataLogin);    
  }
}
