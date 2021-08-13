import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private http: HttpClient,
    private _FileSaverService: FileSaverService
  ) { }

  async getPdf(url: string){
    try {
      return await this.http
      .get(url, {
        observe: 'response',
        responseType: 'blob',
      }).subscribe(res => {
        this._FileSaverService.save((<any>res)._body, 'demo-fer.pdf');
      });     ;

      
      
    } catch (error) {
        return error;
    }

  }


}
