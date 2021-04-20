import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    EditComponent,
    ListComponent,
    UploadComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    EditComponent,
    ListComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
