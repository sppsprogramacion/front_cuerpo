import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';
import { FileSaverOptions } from 'file-saver';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  options: FileSaverOptions = {
    autoBom: false,
  };

base_url: string = environment.URL_BASE;  

  constructor(
    private http: HttpClient,
    private _FileSaverService: FileSaverService
  ) { }





  getPDF(id : number): Observable<Blob>
     {
        //  const url = `http://localhost:3000/archivo/id/pdf?id=${id}`;
        const url = `${this.base_url}/archivo/id/pdf?id=${id}`;
         var authorization = 'Bearer '+sessionStorage.getItem("access_token");

         const headers = new HttpHeaders({ 
                         'Content-Type': 'application/json',
                         "Authorization": authorization, 
                         responseType : 'blob'});

         return this.http.get<Blob>(url, { headers : headers,responseType : 
         'blob' as 'json'});
     }


     async postPdf(archivo: File, legajo: number, detalle: string, fecha_pdf: Date, indice: number){
       try {
         console.log('FILE EN EL SERVICIO', archivo);
          const url = `${this.base_url}/archivo/pdf`;
          const formData = new FormData();
          formData.append('pdf', archivo);
          formData.append('legajo', legajo.toString());
          formData.append('detalle', detalle);
          formData.append('fecha_documento', fecha_pdf.toString());
          formData.append('indice', indice.toString());
          const respuesta = await fetch(url,{
            method: "POST",
            body: formData
          });
          if(!respuesta.ok){
            console.log('LA RESPUESTA ES', respuesta);
            throw new Error('Error en la Subida del Archivo');
          }
          return respuesta;
                  
        } catch (error) {
               return error
        }
    }
   


}
