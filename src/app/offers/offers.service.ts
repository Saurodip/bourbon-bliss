import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offers } from '../offers/offers.model';
import { AppService } from '../app.service';

@Injectable()
export class OffersService {
    private url: string;

    constructor(private appService: AppService) {
        this.url = 'assets/data/offers.json';
    }

    public getOffersData(): Observable<Offers> {
        return this.appService.getRequest(this.url);
    }
}
