import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option } from '../../booking.model';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
    public viewportWidth: number;
    public paymentContent: Array<Option>;
    public paymentForm: FormGroup;

    @Input() set content(value: Array<Option>) {
        if (value) {
            this.paymentContent = value;
        }
    }

    constructor(private formBuilder: FormBuilder) {
        this.viewportWidth = 0;
        this.paymentContent = [];
        this.paymentForm = this.formBuilder.group({
            cardInformation: this.formBuilder.group({
                nameOnCard: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), CustomValidators.characterValidator]],
                cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), CustomValidators.numberValidator]],
                expirationMonth: ['', [Validators.required, CustomValidators.dropdownValidator]],
                expirationYear: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), CustomValidators.dropdownValidator]],
                cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), CustomValidators.numberValidator]]
            })
        });
    }

    ngOnInit() {
    }
}
