import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasinoComponent } from './casino.component';

const routes: Routes = [
  {
    path: '',
    component: CasinoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CasinoRoutingModule { }
