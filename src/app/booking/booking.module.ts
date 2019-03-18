import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookingContainerComponent } from './container/booking.container';
import { HotelReservationComponent } from './container/components/hotel-reservation/hotel-reservation.component';
import { DefaultReservationComponent } from './container/components/default-reservation/default-reservation.component';
import { PaymentComponent } from './container/components/payment/payment.component';
import { BookingService } from './booking.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, BookingRoutingModule, SharedModule],
  declarations: [BookingContainerComponent, HotelReservationComponent, DefaultReservationComponent, PaymentComponent],
  providers: [BookingService]
})

export class BookingModule { }
