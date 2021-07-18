import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { ngPrimeModule } from '../../ngprime.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ngPrimeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    EditComponent,
    ngPrimeModule
  ]
})
export class EditModule { }
