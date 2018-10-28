import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';

@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule
  ],
  declarations: [OffersComponent]
})
export class OffersModule { }
