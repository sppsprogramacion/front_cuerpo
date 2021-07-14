import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';

const routes: Routes = [
    {path:'dashboard', 
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {path:'', component: DashboardComponent},
    {path:'upload', component: UploadComponent},
    {path:'list', component: ListComponent},
    {path:'edit', component: EditComponent},
    {path: 'accountSetting', component: AccountSettingsComponent},

    //mantenimiento
    {path: 'usuarios', component: UsuariosComponent}
    
  ]
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
