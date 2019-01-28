import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersRoutingModule } from './offers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OffersContainerComponent } from './container/offers.container';
import { OffersComponent } from './container/components/offers.component';
import { OffersService } from './offers.service';

@NgModule({
  imports: [CommonModule, OffersRoutingModule, SharedModule],
  declarations: [OffersContainerComponent, OffersComponent],
  providers: [OffersService]
})

export class OffersModule { }
