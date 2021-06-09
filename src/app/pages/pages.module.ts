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
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

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
    RouterModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    HttpClientModule,
    ConfirmDialogModule,
    ConfirmationService,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    DropdownModule
  ]
})
export class PagesModule { }
