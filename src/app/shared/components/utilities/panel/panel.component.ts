import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})

export class PanelComponent implements OnInit {
    public panelContent: any;
    public gridColumnClass: string;

    @Input() template: string;
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
