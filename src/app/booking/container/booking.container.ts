import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../../hotel/hotel.model';
import { BookingService } from '../booking.service';
import { Booking } from '../booking.model';

@Component({
    selector: 'app-booking-container',
    templateUrl: './booking.container.html',
    styleUrls: ['./booking.container.scss']
})

export class BookingContainerComponent implements OnInit {
    public bookingData: Booking;
    public selectedOption: Availability;
    public error: string;

    public bookingData$: Observable<Booking> = this.bookingService.getBookingData();

    constructor(private bookingService: BookingService) {
        this.bookingData = new Booking();
        this.selectedOption = new Availability();
        this.error = '';
    }

    ngOnInit() {
        this.fetchBookingData();
    }

    private fetchBookingData(): void {
        this.bookingService.getBookingData().subscribe(
            (data) => this.bookingData = { ...data },
            (error) => this.error = error
        );
    }
}
