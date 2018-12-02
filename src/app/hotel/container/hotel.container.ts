import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hotel, Availability } from '../hotel.model';

@Component({
    selector: 'app-hotel-container',
    templateUrl: './hotel.container.html',
    styleUrls: ['./hotel.container.scss']
})

export class HotelContainerComponent implements OnInit {
    public hotelData: Hotel;
    public error: string;

    public hotelData$: Observable<Hotel> = this.hotelService.getHotelData();

    constructor(private router: Router, private hotelService: HotelService) {
        this.error = '';
    }

    ngOnInit() {
        this.fetchHotelData();
    }

    private fetchHotelData(): void {
        this.hotelService.getHotelData().subscribe(
            (data) => this.hotelData = { ...data },
            (error) => this.error = error
        );
    }

    public getSelectedOption(option: Availability): void {
        this.router.navigate(['/booking']);
        this.hotelService.setDataForSharing(option);
    }
}
