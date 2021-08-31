import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ngPrimeModule } from '../../ngprime.module';
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    ngPrimeModule,
    FormsModule,
    ProgressSpinnerModule
  ],
  exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
