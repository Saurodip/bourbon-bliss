import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-hotel-container',
    templateUrl: './hotel.container.html',
    styleUrls: ['./hotel.container.scss']
})

export class HotelContainerComponent implements OnInit {
    public hotelData: Hotel;
    public error: string;

    public hotelData$: Observable<Hotel> = this.hotelService.getHotelData();

    constructor(private hotelService: HotelService) {
        this.error = '';
    }

    ngOnInit() {
        this.fetchHotelData();
    }

    private fetchHotelData() {
        this.hotelService.getHotelData().subscribe(
            (data) => this.hotelData = { ...data },
            (error) => this.error = error
        );
    }
}
