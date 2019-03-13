import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeddingContainerComponent } from './container/wedding.container';

const routes: Routes = [
  {
    path: '',
    component: WeddingContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class WeddingRoutingModule { }
