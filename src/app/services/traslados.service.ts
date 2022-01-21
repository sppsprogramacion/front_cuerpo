import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Traslado } from '../models/traslado.model';
import { environment } from 'src/environments/environment';

const base_url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class TrasladosService {


  constructor(
    private http: HttpClient
  ) { }
  //FIN CONSTRUCTOR

  guardarTraslado(data: any){
    let traslado: Traslado= new Traslado();
    traslado={...data};
    return this.http.post(`${base_url}/traslado`, traslado);
}
}
