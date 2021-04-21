import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



const routes: Routes = [
    {path:'dashboard', 
  component: PagesComponent,
  children: [
    {path:'', component: DashboardComponent},
    {path:'upload', component: UploadComponent},
    {path:'list', component: ListComponent},
    {path:'edit', component: EditComponent},
    {path: 'accountSetting', component: AccountSettingsComponent}
    
  ]
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
