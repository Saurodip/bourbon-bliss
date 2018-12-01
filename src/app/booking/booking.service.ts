import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Booking } from './booking.model';

@Injectable()
export class BookingService {
    private url: string;

    constructor(private appService: AppService) {
        this.url = 'assets/data/booking.json';
    }

    public getBookingData(): Observable<Booking> {
        return this.appService.getRequest(this.url);
    }
}
