import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


const base_url = environment.URL_BASE;

@Injectable({
    providedIn: 'root'
})
export class DestinosService {
    constructor(
        private readonly http: HttpClient
    ){}

    listarDestinos(){
        return this.http.get<any[]>(`${base_url}/destino`);
    }
}