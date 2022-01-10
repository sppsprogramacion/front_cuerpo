import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenciasAgregarComponent } from './agregar/licencias-agregar.component';
import { LicenciasListarComponent } from './listar/licencias-listar.component';



@NgModule({
  declarations: [
    LicenciasAgregarComponent,
    LicenciasListarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LicenciasModule { }
