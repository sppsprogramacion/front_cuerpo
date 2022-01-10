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
import { SancionesAgregarComponent } from './sanciones/agregar/sanciones-agregar.component';
import { SancionesListarComponent } from './sanciones/listar/sanciones-listar.component';

import { CarpetaListarComponent } from './reconocimiento-medico/listar/carpeta-listar.component';
import { LicenciasAgregarComponent } from './licencias/agregar/licencias-agregar.component';
import { LicenciasListarComponent } from './licencias/listar/licencias-listar.component';
import { CarpetaAgregarComponent } from './reconocimiento-medico/agregar/carpeta-agregar.component';

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
      {path: 'usuarios', component: UsuariosComponent},

      //sanciones
      {path: 'agregar-sanciones',component: SancionesAgregarComponent},
      {path: 'listar-sanciones', component: SancionesListarComponent},

      //reconocimiento
      {path: 'agregar-carpetas',component: CarpetaAgregarComponent},
      {path: 'listar-carpetas', component: CarpetaListarComponent},

      //licencias
      {path: 'agregar-licencias',component: LicenciasAgregarComponent},
      {path: 'listar-licencias', component: LicenciasListarComponent},
      
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
