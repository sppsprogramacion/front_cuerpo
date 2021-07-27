import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotopersonalPipe } from './fotopersonal.pipe';



@NgModule({
  declarations: [
    FotopersonalPipe
  ],
  exports:[
    FotopersonalPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
