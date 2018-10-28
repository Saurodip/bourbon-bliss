import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NightlifeComponent } from './nightlife.component';

const routes: Routes = [
  {
    path: '',
    component: NightlifeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NightlifeRoutingModule { }
