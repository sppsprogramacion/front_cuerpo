import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ngPrimeModule } from 'src/app/ngprime.module';




@NgModule({
  declarations: [
     UploadComponent
  ],
  imports: [
    CommonModule,
    ngPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    UploadComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UploadModule { }
