import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../models/personal.model';

const base_url = environment.URL_BASE

@Injectable({ 
    providedIn: 'root'
})
export class PersonalService {

    constructor(
        private http: HttpClient
    ){}


        listarPersonal(destino: number){
            return this.http.get<[personal: any[],total:number]>(`${base_url}/personal/destino/${destino}`)
            
        }
    


}