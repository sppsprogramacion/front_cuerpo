import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { ngPrimeModule } from '../../ngprime.module';


@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ngPrimeModule
  ],
  exports: [
    EditComponent,
    ngPrimeModule
  ]
})
export class EditModule { }
