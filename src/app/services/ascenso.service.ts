import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AscensoModel } from '../models/ascenso.model';

const base_url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class AscensoService {
  //base_url: string = environment.URL_BASE;  
  listadoAscenso: AscensoModel []= []; 
  ascenso: Partial<AscensoModel> = new AscensoModel();

  constructor(
    private http: HttpClient
  ) { }
  //FIN CONSTRUCTOR

  //GUARDAR ASCENSO
  guardarAscenso(id_escala_jerarquica: number, data_ascenso: any){    
    this.ascenso={...data_ascenso};

    return this.http.post(`${base_url}/ascenso?id_escala=${id_escala_jerarquica}`, this.ascenso);
  }
  //FIN GUARDAR ASCENSO
}
