import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotopersonalPipe } from './fotopersonal.pipe';
import { FechasPipe } from './fechas.pipe';
import { PdfpersonalPipe } from './pdfpersonal.pipe';



@NgModule({
  declarations: [
    FotopersonalPipe,
    FechasPipe,
    PdfpersonalPipe
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
