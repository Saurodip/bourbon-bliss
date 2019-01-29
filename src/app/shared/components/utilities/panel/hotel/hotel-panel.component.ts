import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-hotel-panel',
    templateUrl: './hotel-panel.component.html',
    styleUrls: ['./hotel-panel.component.scss']
})

export class HotelPanelComponent implements OnInit {
    public panelContent: any;
    public gridColumnClass: string;

    @Input() set gridClass(value: string) {
        if (value) {
            this.gridColumnClass = value;
        }
    }
    @Input() set content(value: any) {
        if (value) {
            this.panelContent = value;
        }
    }

    constructor() {
    }

    ngOnInit() {
    }
}
