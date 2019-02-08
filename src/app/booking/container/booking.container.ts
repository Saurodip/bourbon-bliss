import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../../hotel/hotel.model';
import { BookingService } from '../booking.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AppService } from 'src/app/app.service';
import { Booking, CountryList, Month } from '../booking.model';
import { NavigationHistory } from '../../shared/shared.model';

@Component({
    selector: 'app-booking-container',
    templateUrl: './booking.container.html',
    styleUrls: ['./booking.container.scss']
})

export class BookingContainerComponent implements OnInit {
    public bookingData: Booking;
    public countryList: CountryList;
    public selectedOption: Availability;
    public expiryMonth: Month;
    public navigationHistory: NavigationHistory;
    public error: string;

    public bookingData$: Observable<Booking> = this.bookingService.getBookingData();
    public countryList$: Observable<CountryList> = this.bookingService.getCountryList();
    public month$: Observable<Month> = this.bookingService.getExpiryMonth();

    constructor(private bookingService: BookingService, private sharedService: SharedService, private appService: AppService) {
        this.bookingData = new Booking();
        this.countryList = new CountryList();
        this.selectedOption = new Availability();
        this.expiryMonth = new Month();
        this.navigationHistory = new NavigationHistory();
        this.error = '';
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.fetchBookingData();
        this.fetchCountryList();
        this.getSelectedOption();
        this.fetchExpiryMonth();
        this.getNavigationHistory();
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
        this.appService.hotelSharedData$.subscribe(
            (data) => this.selectedOption = { ...data },
            (error) => this.error = error
        );
    }

    private fetchExpiryMonth(): void {
        this.bookingService.getExpiryMonth().subscribe(
            (data) => this.expiryMonth = { ...data },
            (error) => this.error = error
        );
    }

    private getNavigationHistory(): void {
        this.sharedService.getRouteUrl();
        this.appService.navigationSharedData$.subscribe(
            (data) => this.navigationHistory = { ...data },
            (error) => this.error = error
        );
    }
}
