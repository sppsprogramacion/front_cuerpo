import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SancionesListarComponent } from './listar/sanciones-listar.component';
import { SancionesAgregarComponent } from './agregar/sanciones-agregar.component';




@NgModule({
  declarations: [   
  
    SancionesAgregarComponent,
    SancionesListarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SancionesModule { }
