import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasinoRoutingModule } from './casino-routing.module';
import { CasinoComponent } from './casino.component';

@NgModule({
  imports: [
    CommonModule,
    CasinoRoutingModule
  ],
  declarations: [CasinoComponent]
})
export class CasinoModule { }
