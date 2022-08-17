import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrasladoModel } from '../models/traslado.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { globalConstants } from '../common/global-constants';

const base_url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class TrasladosService {
  base_url: string = environment.URL_BASE;  
  listadoTraslados: TrasladoModel []= []; 
  traslado: Partial<TrasladoModel> = new TrasladoModel();

  constructor(
    private http: HttpClient
  ) { }
  //FIN CONSTRUCTOR

  guardarTraslado(data: any){    
    this.traslado={...data};

    return this.http.post(`${base_url}/traslado`, this.traslado);
  }

  editarTraslado(traslado: Partial<TrasladoModel>,id: number){
    
    
    return this.http.put(`${base_url}/traslado/${id}`, traslado);
  }

  quitarTrasladoVigente(legajox:number){    
    let traslado: TrasladoModel= new TrasladoModel();
    traslado.vigente= false;
    return this.http.put(`${base_url}/traslado/quitar-vigente/${legajox}`,traslado);
  }

  //LISTA DE TRASLADOS X LEGAJO
  getxlegajo(legajo: number) {
    let total: number = 0;
    try {
      const url = `${this.base_url}/traslado/legajo/${legajo}`;
      //return await this.http.get(url);
      return this.http.get<[traslados: any[],total:number]>(`${base_url}/traslado/legajo/${legajo}`)
         
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
  //FIN LISTA DE TRASLADOS X LEGAJO

  //LISTA DE TRASLADOS NUEVOS
  getNuevosTodos() {
    
    try {
      return this.http.get<[traslados: any[],total:number]>(`${base_url}/traslado/nuevos`)
         
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
  //FIN LISTA DE TRASLADOS NUEVOS

  getNuevosXDestino(){
    if(globalConstants.rol_usuario == "0"){
        return this.http.get<[traslados: any[],total:number]>(`${base_url}/traslado/nuevos`)    
    }
    return this.http.get<[traslados: any[],total:number]>(`${base_url}/traslado/nuevos-organismo/${globalConstants.destino_usuario}`)
    
  }

}
