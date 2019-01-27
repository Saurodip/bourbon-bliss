import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})

export class TooltipComponent implements OnInit {
    public tooltipContent: string;
    public arrowDirection: string;

    @Input() set content(value: string) {
        if (value) {
            this.tooltipContent = value;
        }
    }
    @Input() set direction(value: string) {
        if (value) {
            this.arrowDirection = value;
        }
    }

    constructor() {
        this.tooltipContent = '';
        this.arrowDirection = '';
    }

    ngOnInit() {
    }
}
