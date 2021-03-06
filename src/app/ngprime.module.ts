import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
// // import {ConfirmationService} from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';



@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        TableModule,
        // ToastModule,
         ToolbarModule,
         FileUploadModule,
         ConfirmDialogModule,
    //     // ConfirmationService,
         RadioButtonModule,
         InputNumberModule,
         DialogModule,
         DropdownModule,
         BrowserModule,
         BrowserAnimationsModule,
         TabViewModule,
         InputTextModule,
         CardModule
     ],
    exports: [
        CommonModule,
        TableModule,
         //ToastModule,
         ToolbarModule,
         FileUploadModule,
         ConfirmDialogModule,
    //     // ConfirmationService,
         RadioButtonModule,
         InputNumberModule,
         DialogModule,
         DropdownModule,
         BrowserModule,
         BrowserAnimationsModule,
         TabViewModule,
         InputTextModule,
         CardModule
    ],
    providers: [],
})
export class ngPrimeModule {

}