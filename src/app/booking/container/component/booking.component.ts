import { Component, OnInit, Input } from '@angular/core';
import { Fields } from '../../booking.model';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {
    public viewportWidth: number;
    public bookingContent: Fields;

    @Input() set content(value: Fields) {
        if (value) {
            this.bookingContent = value;
        }
    }

    constructor() {
        this.viewportWidth = 0;
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
    }
}
