 import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { DashboardComponent } from './dashboard/dashboard.component';
 import { PagesComponent } from './pages.component';
 import { SharedModule } from '../shared/shared.module';
 import { RouterModule } from '@angular/router';
 import { HttpClientModule } from '@angular/common/http';
import { EditModule } from './edit/edit.module';
import { ListModule } from './list/list.module';
import { UploadModule } from './upload/upload.module';
import { UsuariosModule } from './mantenimiento/usuarios.module';

 @NgModule({
  declarations: [
     DashboardComponent,
     PagesComponent,
   ],
   exports: [
     DashboardComponent,
     PagesComponent,
   ],
   imports: [
     CommonModule,
     SharedModule,
     RouterModule,
     EditModule,
     ListModule,
     UploadModule,
     UsuariosModule,
     HttpClientModule,
     
   ]
 })
export class PagesModule { }
