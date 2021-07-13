import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ngPrimeModule } from '../../ngprime.module';




@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ngPrimeModule
  ],
  exports: [
    ListComponent,
    ngPrimeModule
    ]
})
export class ListModule { }
