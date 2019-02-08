import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { AppService } from '../app.service';
import { Booking, CountryList, Month } from './booking.model';

@Injectable()
export class BookingService {
    private url: Array<string>;

    constructor(private sharedService: SharedService, private appService: AppService) {
        this.url = ['assets/data/booking.json', 'assets/data/country.json', 'assets/data/calendar.json'];
    }

    public getBookingData(): Observable<Booking> {
        return this.appService.getRequest(this.url[0]);
    }

    public getCountryList(): Observable<CountryList> {
        return this.appService.getRequest(this.url[1]);
    }

    public getExpiryMonth(): Observable<Month> {
        return this.appService.getRequest(this.url[2]);
    }
}
