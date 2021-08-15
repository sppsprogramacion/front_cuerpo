import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';
import { FileSaverOptions } from 'file-saver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  options: FileSaverOptions = {
    autoBom: false,
  };

  

  constructor(
    private http: HttpClient,
    private _FileSaverService: FileSaverService
  ) { }





  getPDF(id : number): Observable<Blob>
     {
         const url = `http://localhost:3000/archivo/id/pdf?id=${id}`;
         var authorization = 'Bearer '+sessionStorage.getItem("access_token");

         const headers = new HttpHeaders({ 
                         'Content-Type': 'application/json',
                         "Authorization": authorization, 
                         responseType : 'blob'});

         return this.http.get<Blob>(url, { headers : headers,responseType : 
         'blob' as 'json'});
     }
   


}