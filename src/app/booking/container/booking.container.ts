import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../../hotel/hotel.model';
import { Coupon } from '../../offers/offers.model';
import { Booking, CountryList, Month } from '../booking.model';
import { NavigationHistory } from '../../shared/shared.model';
import { BookingService } from '../booking.service';
import { SharedService } from '../../shared/shared.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-booking-container',
    templateUrl: './booking.container.html',
    styleUrls: ['./booking.container.scss']
})

export class BookingContainerComponent implements OnInit {
    public viewportWidth: number;
    public gridColumnClass: string;
    public bookingData: Booking;
    public countryList: CountryList;
    public selectedOption: Availability;
    public selectedCoupon: Coupon;
    public expiryMonth: Month;
    public navigationHistory: NavigationHistory;
    private storageObject: object;
    public error: string;

    public bookingData$: Observable<Booking> = this.bookingService.getBookingData();
    public countryList$: Observable<CountryList> = this.bookingService.getCountryList();
    public month$: Observable<Month> = this.bookingService.getExpiryMonth();

    constructor(private bookingService: BookingService, private sharedService: SharedService, private appService: AppService) {
        this.viewportWidth = 0;
        this.gridColumnClass = '';
        this.bookingData = new Booking();
        this.countryList = new CountryList();
        this.selectedOption = new Availability();
        this.selectedCoupon = new Coupon();
        this.expiryMonth = new Month();
        this.navigationHistory = new NavigationHistory();
        this.storageObject = { action: '', variable: '', value: null };
        this.error = '';
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.viewportWidth = window.outerWidth;
        this.gridColumnClass = this.viewportWidth > 767 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
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
        this.appService.couponSharedData$.subscribe(
            (data) => this.selectedCoupon = { ...data },
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
            (data) => {
                this.navigationHistory = { ...data };
                if (!this.navigationHistory.previousMenu) {
                    this.storageObject = { action: 'get', variable: 'PreviousRoute' };
                    this.navigationHistory.previousMenu = this.sharedService.applyStorage(this.storageObject);
                }
            },
            (error) => this.error = error
        );
    }
}
