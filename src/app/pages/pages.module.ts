import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    EditComponent,
    ListComponent,
    UploadComponent,
    AccountSettingsComponent,
    UsuariosComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    EditComponent,
    ListComponent,
    UploadComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
