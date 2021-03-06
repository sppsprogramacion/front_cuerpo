import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrasladoModel } from '../models/traslado.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PersonalFuncionModel } from '../models/personal_funcion.model';

const base_url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class PersonalFuncionService {
  base_url: string = environment.URL_BASE;  
  listadoFunciones: PersonalFuncionModel []= []; 
  funcion: PersonalFuncionModel= new PersonalFuncionModel();

  constructor(
    private http: HttpClient
  ) { }
  //FIN CONSTRUCTOR

  guardarFuncion(data: any){
    
    this.funcion={...data};
    return this.http.post(`${base_url}/personal-funcion`, this.funcion);
  }

  editarFuncion(funcion: Partial<PersonalFuncionModel>,id: number){
    
    
    return this.http.put(`${base_url}/personal-funcion/${id}`, funcion);
  }

  quitarFuncionVigente(legajox:number){    
    let funcion: PersonalFuncionModel= new PersonalFuncionModel();
    funcion.vigente= false;
    return this.http.put(`${base_url}/personal-funcion/quitar/${legajox}`,funcion);
  }

  //LISTA DE TRASLADOS X LEGAJO
  getxlegajo(legajo: number) {
    let total: number = 0;
    try {
      const url = `${this.base_url}/personal-funcion/legajo/${legajo}`;
      //return await this.http.get(url);
      return this.http.get<[funciones: any[],total:number]>(`${base_url}/personal-funcion/legajo/${legajo}`)
         
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
  //FIN LISTA DE TRASLADOS X LEGAJO

}
