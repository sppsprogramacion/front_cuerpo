import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { ngPrimeModule } from '../../ngprime.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import { FileSaverModule } from 'ngx-filesaver';
import { NgxPrintModule } from 'ngx-print';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
//import { QRCodeModule } from 'angular2-qrcode';

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
    FileSaverModule,
    NgxPrintModule,
    NgxQRCodeModule,
    QRCodeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    EditComponent,
    ngPrimeModule,
    PipesModule,
    FileSaverModule
  ],
  providers: [
    DatePipe
  ]
})
export class EditModule { }
