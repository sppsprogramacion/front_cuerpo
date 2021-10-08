import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';
import { FileSaverOptions } from 'file-saver';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PdfModel } from '../models/pdf.model';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  options: FileSaverOptions = {
    autoBom: false,
  };

base_url: string = environment.URL_BASE;  
listadoPdfs: PdfModel[] = [];
pdf: PdfModel = new PdfModel();


  constructor(
    private http: HttpClient,
    private _FileSaverService: FileSaverService
  ) { }





  getPDF(key : string): Observable<Blob>
     {
         const url = `${this.base_url}/archivo/s3/pdf?key=${key}`;
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
          const url = `${this.base_url}/archivo/pdf`;
          if(!detalle || detalle === null){
            throw new Error('El detalle del Pdf debe ser llenado');
          }
          if(!fecha_pdf || fecha_pdf === null){
            throw new Error('Debe proveer la fecha del pdf');
          }
          if(!indice || indice === null){
            throw new Error('El indice es la posición del pdf y es obligatorio');
          }
          if(!archivo || archivo === null){
            throw new Error('Debe adjuntar un Archivo pdf');
          }
          if(!legajo || legajo === null){
            throw new Error('Falta agregar dato del personal');
          }
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

    
    getxlegajo(legajo: number) {
      let total: number = 0;
      try {
        const url = `${this.base_url}/archivo/${legajo}`;
        //return await this.http.get(url);
        return  this.http.get(url)
                            .pipe(
                              map((resp: any) => {
                                
                                this.listadoPdfs = resp[0].map((item: any) => {
                                  const total: number = item[1];
                                  const {id_archivo, legajo_personal, nombre_archivo, detalle, indice, fecha_documento} = item;
                                  this.pdf = new PdfModel(id_archivo, legajo_personal, nombre_archivo, detalle, indice, fecha_documento);
                                  return this.pdf;                                     
                                });
                                return resp = {
                                  ok: true,
                                  total,
                                  pdfs: this.listadoPdfs
                                }
                              })
                            )
        ;
           
      } catch (error:any) {
        throw new Error(error.message)
      }
    }

    deletePdf(id: number){
      try {
            const url = `${this.base_url}/archivo/${id}`;
            return this.http.delete(url);
        } catch (error: any) {
            throw new Error(error);
        
      }
    }


}
