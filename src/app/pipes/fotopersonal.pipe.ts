import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.URL_BASE;

@Pipe({
  name: 'fotopersonal'
})
export class FotopersonalPipe implements PipeTransform {

  transform(imagen: string): string {
    if(imagen){
      return `${base_url}/personal/foto?foto_nombre=${imagen}`;
  }else{
      return `${base_url}/personal/foto?foto_nombre==no-image.png`;
  }
  }

}
