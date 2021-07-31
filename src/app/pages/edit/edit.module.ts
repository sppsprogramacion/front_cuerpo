import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { ngPrimeModule } from '../../ngprime.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ngPrimeModule,
    PipesModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    EditComponent,
    ngPrimeModule,
    PipesModule
  ],
  providers: [
    DatePipe
  ]
})
export class EditModule { }
