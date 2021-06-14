import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ngPrimeModule } from '../../ngprime.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    ngPrimeModule,
    FormsModule
  ],
  exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
