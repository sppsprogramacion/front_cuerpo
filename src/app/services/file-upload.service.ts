import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';


const base_url = environment.URL_BASE
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient
  ) { }

  async actualizarFoto(archivo: File, id: number){
      try {
        const url = `${base_url}/usuarios/foto?id=${id}`;
        const formData = new FormData();
        formData.append('foto', archivo);
        const respuesta = await fetch(url,{
          method: "POST",
          body: formData
        });
        if(!respuesta.ok){
          throw new Error('Error en la Actualización de la Foto del Usuario');
        }
        return respuesta;
                
      } catch (error) {
             return error
      }
  }

  async actualizarFotoPersonal(archivo: File, id: number){
     try {
        const url = `${base_url}/personal/foto?id=${id}`;
        const formData = new FormData();
        formData.append('foto', archivo);
        const respuesta = await fetch(url,{
          method: "POST",
          body: formData
        });
        if(!respuesta.ok){
          throw new Error('Error en la Actualización de la Foto del Personal');
        }
        return respuesta;
                
      } catch (error) {
             return error
      }
  }
}
