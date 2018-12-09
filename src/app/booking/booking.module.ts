import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookingContainerComponent } from './container/booking.container';
import { BookingComponent } from './container/component/booking.component';
import { BookingService } from './booking.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, BookingRoutingModule, SharedModule],
  declarations: [BookingContainerComponent, BookingComponent],
  exports: [BookingContainerComponent, BookingComponent],
  providers: [BookingService]
})

export class BookingModule { }
