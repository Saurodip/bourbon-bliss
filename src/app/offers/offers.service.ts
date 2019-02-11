import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offers, Coupon } from '../offers/offers.model';
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

    public setDataForSharing(data: Coupon): void {
        this.appService.onSharingData(data, 'coupon');
    }
}
