import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantContainerComponent } from './container/restaurant.container';

const routes: Routes = [
  {
    path: '',
    component: RestaurantContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class RestaurantRoutingModule { }
