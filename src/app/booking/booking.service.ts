import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Booking, CountryList } from './booking.model';

@Injectable()
export class BookingService {
    private url: Array<string>;

    constructor(private appService: AppService) {
        this.url = ['assets/data/booking.json', 'assets/data/country.json'];
    }

    public getBookingData(): Observable<Booking> {
        return this.appService.getRequest(this.url[0]);
    }

    public getCountryList(): Observable<CountryList> {
        return this.appService.getRequest(this.url[1]);
    }
}
