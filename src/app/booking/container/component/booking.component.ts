import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {
    public viewportWidth: number;

    @Input() set content(value) {
        if (value) {

        }
    }

    constructor() {
        this.viewportWidth = 0;
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
    }
}
