import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'fechas'
})
export class FechasPipe implements PipeTransform {
  constructor(
    private readonly datePipe: DatePipe
  ){}

  transform(fecha: Date
    ) {
      if(fecha != null){
        let auxiliar =  this.datePipe.transform(fecha,"dd-MM-yyyy")!;
        return auxiliar;
  }else{
    return null
  }
    }

}
