import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurants, Restaurant } from '../restaurant/restaurant.model';
import { AppService } from '../app.service';

@Injectable()
export class RestaurantService {
    private url: string;

    constructor(private appService: AppService) {
        this.url = 'assets/data/restaurant.json';
    }

    public getRestaurantData(): Observable<Restaurants> {
        return this.appService.getRequest(this.url);
    }

    public setDataForSharing(data: Restaurant): void {
        this.appService.onSharingData(data, 'restaurant');
    }
}
