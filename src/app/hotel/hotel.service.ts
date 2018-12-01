import { Injectable } from '@angular/core';
import { Hotel, Availability } from './hotel.model';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable()
export class HotelService {
  private url: string;

  constructor(private appService: AppService) {
    this.url = 'assets/data/hotel.json';
  }

  public getHotelData(): Observable<Hotel> {
    return this.appService.getRequest(this.url);
  }
}
