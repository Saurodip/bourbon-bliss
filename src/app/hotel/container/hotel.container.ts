import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel.model';

@Component({
    selector: 'app-hotel-container',
    templateUrl: './hotel.container.html'
})

export class HotelContainerComponent implements OnInit {
    public hotelData: Hotel;
    public error: string;

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
