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
  //FIN CONSTRUCTOR.....................

  //LISTA DE ASCENSOS X FECHA Y GRADO
  getListaXFechaGrado(fecha_ascenso: Date) {
    let total: number = 0;
    try {
      
      return this.http.get<[ascensos: any[],total:number]>(`${base_url}/ascenso/nuevos-ascensos?fecha_ascenso=${fecha_ascenso}`)
         
    } catch (error:any) {
      throw new Error("Error al obtener lista" + error.message)
    }
  }
  //FIN LISTA DE ASCENSOS X FECHA Y GRADO..................................

  //GUARDAR ASCENSO
  guardarAscenso(id_escala_jerarquica: number, data_ascenso: any){    
    this.ascenso={...data_ascenso};
    
    return this.http.post(`${base_url}/ascenso?id_escala=${id_escala_jerarquica}`, this.ascenso);
  }
  //FIN GUARDAR ASCENSO...........................................
}
