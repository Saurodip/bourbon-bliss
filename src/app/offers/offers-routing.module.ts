import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersContainerComponent } from './container/offers.container';

const routes: Routes = [
  {
    path: '',
    component: OffersContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class OffersRoutingModule { }
