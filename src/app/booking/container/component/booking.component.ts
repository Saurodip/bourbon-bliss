import { Component, OnInit, Input } from '@angular/core';
import { Option } from '../../booking.model';
import { Availability } from 'src/app/hotel/hotel.model';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {
    public viewportWidth: number;
    public bookingContent: Option;
    public gridColumnClass: string;
    public selectedItem: Availability;

    @Input() set content(value: Option) {
        if (value) {
            this.bookingContent = value;
        }
    }
    @Input() set selectedOption(value: Availability) {
        if (value) {
            this.selectedItem = value;
        }
    }

    constructor() {
        this.viewportWidth = 0;
        this.bookingContent = new Option();
        this.gridColumnClass = '';
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
        this.gridColumnClass = this.viewportWidth > 767 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
    }
}
