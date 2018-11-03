import { Component, OnInit, Input } from '@angular/core';
import { Content, Availability } from '../../hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})

export class HotelComponent implements OnInit {
  public viewportWidth: number;
  public hotelContent: Content;
  public checkboxIndex: number;
  public arrayIndex: number;
  public gridClass: string;
  public availability: Array<Availability>;

  @Input() set content(value: Content) {
    if (value) {
      this.hotelContent = value;
      this.onApplyFilter('view all', 0);
    }
  }

  constructor() {
    this.viewportWidth = 0;
    this.checkboxIndex = 0;
    this.arrayIndex = 0;
    this.gridClass = '';
    this.availability = [];
  }

  ngOnInit() {
    this.viewportWidth = window.outerWidth;
  }

  public onApplyFilter(type, index) {
    this.checkboxIndex = index;
    if (type && type.toLowerCase() === 'view all') {
      this.availability = this.hotelContent.availability;
    } else {
      this.availability = this.hotelContent.availability.filter(item => item.type && item.type.toLowerCase() === type);
    }
  }

  public onChangeView(arrayIndex): void {
    this.arrayIndex = arrayIndex === 0 ? 1 : 0;
    this.gridClass = this.arrayIndex === 0 ? 'col-xs-12' : 'col-xs-12 col-md-3';
  }
}
