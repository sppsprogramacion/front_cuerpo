import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarpetaListarComponent } from './listar/carpeta-listar.component';
import { CarpetaAgregarComponent } from './agregar/carpeta-agregar.component';



@NgModule({
  declarations: [
    CarpetaAgregarComponent,
    CarpetaListarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReconocimientoMedicoModule { }
