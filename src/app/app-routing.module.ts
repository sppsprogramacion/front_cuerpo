import { NgModule } from '@angular/core';
//modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [
   //path: '/dashboard' PageComponent
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {path:'**', component: NopagefoundComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
