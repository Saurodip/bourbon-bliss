import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntertainmentComponent } from './entertainment.component';

const routes: Routes = [
  {
    path: '',
    component: EntertainmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EntertainmentRoutingModule { }
