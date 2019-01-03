import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option, Month, MonthInfo } from '../../booking.model';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
    public viewportWidth: number;
    public paymentContent: Array<Option>;
    public expiryMonth: Array<MonthInfo>;
    public expiryYear: Array<number>;
    public paymentForm: FormGroup;

    @Input() set content(value: Array<Option>) {
        if (value) {
            this.paymentContent = value;
        }
    }
    @Input() set month(value: Month) {
        if (value) {
            this.expiryMonth = value.month;
        }
    }

    constructor(private formBuilder: FormBuilder) {
        this.viewportWidth = 0;
        this.paymentContent = [];
        this.expiryMonth = [];
        this.expiryYear = [];
        this.paymentForm = this.formBuilder.group({
            cardInformation: this.formBuilder.group({
                nameOnCard: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), CustomValidators.characterValidator]],
                cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), CustomValidators.numberValidator]],
                expiryMonth: ['none', [Validators.required, CustomValidators.dropdownValidator]],
                expiryYear: ['none', [Validators.required, CustomValidators.dropdownValidator]],
                cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), CustomValidators.numberValidator]]
            })
        });
    }

    ngOnInit() {
        this.getExpiryYear();
    }

    private getExpiryYear(): void {
        let currentYear: number = new Date().getFullYear();
        for (let i: number = 0; i < 5; i++) {
            this.expiryYear.push(currentYear + i);
        }
    }

    public resetPaymentForm(): void {
        this.paymentForm.reset({
            cardInformation: {
                expiryMonth: 'none',
                expiryYear: 'none'
            }
        });
    }
}
