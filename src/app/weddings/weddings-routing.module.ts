import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeddingsComponent } from './weddings.component';

const routes: Routes = [
  {
    path: '',
    component: WeddingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WeddingsRoutingModule { }
