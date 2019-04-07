import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Content, Restaurant, AdditionalInfo } from '../../restaurant.model';

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss']
})

export class RestaurantComponent implements OnInit {
    public viewportWidth: number;
    public restaurantContent: Content;
    public selectedFilterIndex: number;
    public arrayIndex: number;
    public gridRowClass: string;
    public gridColumnClass: string;
    public restaurants: Array<Restaurant>;

    @Input() set content(value: Content) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.restaurantContent = value;
            this.onApplyFilter('view all', 0);
        }
    }
    @Output() selectedRestaurant = new EventEmitter<Restaurant>();

    constructor() {
        this.viewportWidth = 0;
        this.restaurantContent = new Content();
        this.selectedFilterIndex = 0;
        this.arrayIndex = 0;
        this.gridRowClass = '';
        this.gridColumnClass = '';
        this.restaurants = [];
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
        this.arrayIndex = this.viewportWidth <= 767 ? 0 : 1;
        this.onChangeView(this.arrayIndex);
    }

    public onApplyFilter(type: string, index: number): void {
        this.selectedFilterIndex = index;
        type = type && type.toLowerCase();
        if (type === 'view all') {
            this.restaurants = this.restaurantContent.restaurants;
        } else {
            this.restaurants = [];
            this.restaurantContent.restaurants.forEach((restaurant: Restaurant) => {
                if (restaurant.info.find((item: AdditionalInfo) => item.key === 'location' && item.value.toLowerCase() === type)) {
                    this.restaurants.push(restaurant);
                }
            });
        }
    }

    public onChangeView(arrayIndex: number): void {
        this.arrayIndex = arrayIndex === 0 ? 1 : 0;
        this.gridRowClass = this.arrayIndex === 0 ? 'col-xs-12' : 'col-xs-12 col-sm-3';
        this.gridColumnClass = this.arrayIndex === 0 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
    }

    public onBookingRestaurant(index: number): void {
        this.selectedRestaurant.emit(this.restaurants[index]);
    }
}
