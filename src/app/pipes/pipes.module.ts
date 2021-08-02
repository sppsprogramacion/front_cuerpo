import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotopersonalPipe } from './fotopersonal.pipe';
import { FechasPipe } from './fechas.pipe';



@NgModule({
  declarations: [
    FotopersonalPipe,
    FechasPipe
  ],
  exports:[
    FotopersonalPipe,
    FechasPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
