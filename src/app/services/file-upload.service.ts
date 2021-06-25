import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


const base_url = environment.URL_BASE
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(archivo: File, id: number){
      try {
        const url = `${base_url}/usuarios/foto?id=${id}`;
        const formData = new FormData();
        formData.append('foto', archivo);
        const respuesta = await fetch(url,{
          method: "POST",
          body: formData
        });
        console.log('RESPUESTA A LA PETICION',respuesta);
      } catch (error) {
        Swal.fire("Error al Actualizar Foto", error.error.message, "error");
      }
  }
}
