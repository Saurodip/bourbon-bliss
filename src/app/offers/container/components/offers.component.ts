import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Content } from '../../offers.model';


@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss']
})

export class OffersComponent implements OnInit {
    public viewportWidth: number;
    public offersContent: Content;

    @Input() set content(value: Content) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.offersContent = value;
            this.onApplyFilter('view all', 0);
        }
    }
    @Output() selectedOption = new EventEmitter<Content>();

    constructor() {
        this.viewportWidth = 0;
        this.offersContent = new Content();
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
    }

    public onApplyFilter(type: string, index: number): void {
        // this.checkboxIndex = index;
        // type = type && type.toLowerCase();
        // if (type === 'view all') {
        //     this.availability = this.hotelContent.availability;
        // } else {
        //     this.availability = this.hotelContent.availability.filter(item => item.type && item.type.toLowerCase() === type);
        // }
    }
}
