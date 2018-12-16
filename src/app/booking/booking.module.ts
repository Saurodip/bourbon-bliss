import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookingContainerComponent } from './container/booking.container';
import { ReservationComponent } from './container/component/reservation.component';
import { BookingService } from './booking.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, BookingRoutingModule, SharedModule],
  declarations: [BookingContainerComponent, ReservationComponent],
  exports: [BookingContainerComponent, ReservationComponent],
  providers: [BookingService]
})

export class BookingModule { }
