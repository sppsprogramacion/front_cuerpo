import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscensosAgregarComponent } from './agregar/ascensos-agregar.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngPrimeModule } from 'src/app/ngprime.module';



@NgModule({
  declarations: [
    AscensosAgregarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ngPrimeModule,    
    ReactiveFormsModule,
    ProgressSpinnerModule
  ]
})
export class AscensosModule { }
