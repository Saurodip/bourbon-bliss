import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Content, MarriageHall } from '../../wedding.model';


@Component({
    selector: 'app-wedding',
    templateUrl: './wedding.component.html',
    styleUrls: ['./wedding.component.scss']
})

export class WeddingComponent implements OnInit {
    public viewportWidth: number;
    public weddingContent: Content;
    // public selectedFilterIndex: number;
    public arrayIndex: number;
    public gridRowClass: string;
    public gridColumnClass: string;
    public marriageHall: Array<MarriageHall>;

    @Input() set content(value: Content) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.weddingContent = value;
            // this.onApplyFilter('view all', 0);
        }
    }
    @Output() selectedCoupon = new EventEmitter<MarriageHall>();

    constructor() {
        this.viewportWidth = 0;
        this.weddingContent = new Content();
        // this.selectedFilterIndex = 0;
        this.arrayIndex = 0;
        this.gridRowClass = '';
        this.gridColumnClass = '';
        this.marriageHall = [];
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
        this.arrayIndex = this.viewportWidth <= 767 ? 0 : 1;
        this.onChangeView(this.arrayIndex);
    }

    // public onApplyFilter(type: string, index: number): void {
    //     this.selectedFilterIndex = index;
    //     type = type && type.toLowerCase();
    //     if (type === 'view all') {
    //         this.coupons = this.offersContent.coupons;
    //     } else {
    //         this.coupons = this.offersContent.coupons.filter((item: Coupon) => item.type && item.type.toLowerCase() === type);
    //     }
    // }

    public onChangeView(arrayIndex: number): void {
        this.arrayIndex = arrayIndex === 0 ? 1 : 0;
        this.gridRowClass = this.arrayIndex === 0 ? 'col-xs-12' : 'col-xs-12 col-sm-3';
        this.gridColumnClass = this.arrayIndex === 0 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
    }

    // public onCouponPurchase(index: number): void {
    //     this.selectedCoupon.emit(this.coupons[index]);
    // }
}
