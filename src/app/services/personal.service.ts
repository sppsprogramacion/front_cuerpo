import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../models/personal.model';
import { globalConstants } from '../common/global-constants';

const base_url = environment.URL_BASE

@Injectable({ 
    providedIn: 'root'
})
export class PersonalService {

    constructor(
        private http: HttpClient
    ){}


        listarPersonal(destino: number){
            if(globalConstants.rol_usuario == "0"){
                return this.http.get<[personal: any[],total:number]>(`${base_url}/personal`)    
            }
            return this.http.get<[personal: any[],total:number]>(`${base_url}/personal/destino/${destino}`)
            
        }

        editPersonal(data: Partial<Personal>,id: number){
            return this.http.put(`${base_url}/personal/${id}`, data);
        }

        guardarPersonal(data: any){
            let personal: Personal= new Personal();
            personal={...data};
            return this.http.post(`${base_url}/personal`, personal);
        }
    


}