import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  public gridRowClass: string;
  public gridColumnClass: string;
  public availability: Array<Availability>;

  @Input() set content(value: Content) {
    if (value) {
      this.hotelContent = value;
      this.onApplyFilter('view all', 0);
    }
  }
  @Output() selectedOption = new EventEmitter<Availability>();

  constructor() {
    this.viewportWidth = 0;
    this.checkboxIndex = 0;
    this.arrayIndex = 0;
    this.gridRowClass = '';
    this.gridColumnClass = '';
    this.availability = [];
  }

  ngOnInit() {
    this.viewportWidth = window.outerWidth;
    this.arrayIndex = this.viewportWidth <= 767 ? 0 : 1;
    this.onChangeView(this.arrayIndex);
  }

  public onApplyFilter(type: string, index: number): void {
    this.checkboxIndex = index;
    type = type && type.toLowerCase();
    if (type === 'view all') {
      this.availability = this.hotelContent.availability;
    } else {
      this.availability = this.hotelContent.availability.filter(item => item.type && item.type.toLowerCase() === type);
    }
  }

  public onChangeView(arrayIndex: number): void {
    this.arrayIndex = arrayIndex === 0 ? 1 : 0;
    this.gridRowClass = this.arrayIndex === 0 ? 'col-xs-12' : 'col-xs-12 col-sm-3';
    this.gridColumnClass = this.arrayIndex === 0 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
  }

  public onSelection(index: number): void {
    this.selectedOption.emit(this.availability[index]);
  }
}
