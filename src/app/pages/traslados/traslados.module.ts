import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrasladosAgregarComponent } from './agregar/traslados-agregar.component';
import { TrasladosListarComponent } from './listar/traslados-listar.component';



@NgModule({
  declarations: [
    TrasladosAgregarComponent,
    TrasladosListarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TrasladosModule { }
