import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'upload', component: UploadComponent},
  {path:'list', component: ListComponent},
  {path:'edit', component: EditComponent},
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {path:'**', component: NopagefoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
