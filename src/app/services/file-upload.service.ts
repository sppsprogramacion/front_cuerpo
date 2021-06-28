import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


const base_url = environment.URL_BASE
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient
  ) { }

  async actualizarFoto(archivo: File, id: number){
    // const url = `${base_url}/usuarios/foto?id=${id}`;
    // const formData = new FormData();
    // formData.append('foto', archivo);
    // return this.http.post(url, formData);
      try {
        const url = `${base_url}/usuarios/foto?id=${id}`;
        const formData = new FormData();
        formData.append('foto', archivo);
        const respuesta = await fetch(url,{
          method: "POST",
          body: formData
        });
        console.log('ESTADO', respuesta.ok);
                
      } catch (error) {
        Swal.fire("Error al Actualizar Foto", error.error.message, "error");
      }
  }
}
