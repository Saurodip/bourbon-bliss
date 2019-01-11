import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
    public modalContent: object;

    @Input() set content(value: any) {
        if (value) {
            this.modalContent = value;
        }
    }
    @Output() modalState = new EventEmitter<boolean>();

    constructor() {
        this.modalContent = {};
    }

    ngOnInit() {
    }

    public onClose(): void {
        this.modalState.emit();
    }
}
