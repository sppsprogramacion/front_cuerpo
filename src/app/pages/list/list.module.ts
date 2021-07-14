import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ngPrimeModule } from '../../ngprime.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ngPrimeModule,
    RouterModule
  ],
  exports: [
    ListComponent,
    ngPrimeModule
    ]
})
export class ListModule { }
