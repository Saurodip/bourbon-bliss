import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';

import { BookingContainerComponent } from './booking.container';
import { BookingComponent } from './container/component/booking.component';

@NgModule({
  imports: [CommonModule, BookingRoutingModule, SharedModule],
  declarations: [BookingContainerComponent, BookingComponent],
  exports: [BookingContainerComponent, BookingComponent],
  providers: []
})

export class BookingModule { }
