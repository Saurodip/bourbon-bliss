import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../../hotel/hotel.model';
import { AppService } from 'src/app/app.service';
import { BookingService } from '../booking.service';
import { Booking, CountryList, Country } from '../booking.model';

@Component({
    selector: 'app-booking-container',
    templateUrl: './booking.container.html',
    styleUrls: ['./booking.container.scss']
})

export class BookingContainerComponent implements OnInit {
    public bookingData: Booking;
    public countryList: CountryList;
    public selectedOption: Availability;
    public error: string;

    public bookingData$: Observable<Booking> = this.bookingService.getBookingData();
    public countryList$: Observable<CountryList> = this.bookingService.getCountryList();

    constructor(private bookingService: BookingService, private appService: AppService) {
        this.bookingData = new Booking();
        this.countryList = new CountryList();
        this.selectedOption = new Availability();
        this.error = '';
    }

    ngOnInit() {
        this.fetchBookingData();
        this.fetchCountryList();
        this.getSelectedOption();
    }

    private fetchBookingData(): void {
        this.bookingService.getBookingData().subscribe(
            (data) => this.bookingData = { ...data },
            (error) => this.error = error
        );
    }

    private fetchCountryList(): void {
        this.bookingService.getCountryList().subscribe(
            (data) => this.countryList = { ...data },
            (error) => this.error = error
        );
    }

    private getSelectedOption(): void {
        this.appService.sharedData$.subscribe(
            (data) => this.selectedOption = { ...data },
            (error) => this.error = error
        );
    }
}
