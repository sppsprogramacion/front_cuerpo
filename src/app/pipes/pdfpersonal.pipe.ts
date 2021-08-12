import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.URL_BASE;

@Pipe({
  name: 'pdfpersonal'
})
export class PdfpersonalPipe implements PipeTransform {

  transform(pdf_id: string): string {
    return `${base_url}/archivo/id/pdf?id=${pdf_id}`;
  }

}
