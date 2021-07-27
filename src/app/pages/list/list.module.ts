import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ngPrimeModule } from '../../ngprime.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';





@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ngPrimeModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    ListComponent,
    ngPrimeModule,
    PipesModule
    ]
})
export class ListModule { }
