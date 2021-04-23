import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound.component';

const routes: Routes = [
    { path: 'nopagefound', component: NopagefoundComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
