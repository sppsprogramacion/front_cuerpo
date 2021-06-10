import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ngPrimeModule } from '../../ngprime.module';



@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    ngPrimeModule
  ],
  exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
