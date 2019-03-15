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
    public selectedFilterIndex: number;
    public arrayIndex: number;
    public gridRowClass: string;
    public gridColumnClass: string;

    @Input() set content(value: Content) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.weddingContent = value;
        }
    }
    @Output() selectedMarriageHall = new EventEmitter<MarriageHall>();

    constructor() {
        this.viewportWidth = 0;
        this.weddingContent = new Content();
        this.selectedFilterIndex = 0;
        this.arrayIndex = 0;
        this.gridRowClass = '';
        this.gridColumnClass = '';
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
        this.arrayIndex = this.viewportWidth <= 767 ? 0 : 1;
        this.onChangeView(this.arrayIndex);
    }

    public onChangeView(arrayIndex: number): void {
        this.arrayIndex = arrayIndex === 0 ? 1 : 0;
        this.gridRowClass = this.arrayIndex === 0 ? 'col-xs-12' : 'col-xs-12 col-sm-3';
        this.gridColumnClass = this.arrayIndex === 0 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
    }

    public onBookMarriageHall(index: number): void {
        this.selectedMarriageHall.emit(this.weddingContent.marriageHalls[index]);
    }
}
