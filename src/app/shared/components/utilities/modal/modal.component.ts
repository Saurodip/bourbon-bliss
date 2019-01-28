import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
    public modalContent: object;
    public displayPropertyValue: string;

    @Input() set content(value: any) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.modalContent = value;
        }
    }

    constructor() {
        this.modalContent = {};
        this.displayPropertyValue = 'none';
    }

    ngOnInit() {
    }

    public onShowModalPopover(): void {
        this.displayPropertyValue = 'flex';
    }

    public onHideModalPopover(): void {
        this.displayPropertyValue = 'none';
    }
}
