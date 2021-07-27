import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { ngPrimeModule } from '../../ngprime.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ngPrimeModule,
    PipesModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    EditComponent,
    ngPrimeModule,
    PipesModule
  ]
})
export class EditModule { }
