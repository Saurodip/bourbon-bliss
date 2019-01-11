import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option, Month, MonthInfo } from '../../booking.model';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit, OnDestroy {
    public viewportWidth: number;
    public paymentContent: Array<Option>;
    private cachedFormData: Option;
    public expiryMonth: Array<MonthInfo>;
    public expiryYear: Array<number>;
    private storageObject: object;
    public modalObject: object;
    public paymentForm: FormGroup;

    @Input() set content(value: Array<Option>) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.paymentContent = value;
        } else {
            this.storageObject = { action: 'get', variable: 'CardDetails' };
            this.cachedFormData = this.sharedService.applyStorage(this.storageObject);
            this.cachedFormData = this.cachedFormData && this.cachedFormData['cardInformation'];
        }
        this.initializePaymentForm();
    }
    @Input() set month(value: Month) {
        if (value) {
            this.expiryMonth = value.month;
        }
    }

    constructor(private formBuilder: FormBuilder, private sharedService: SharedService) {
        this.viewportWidth = 0;
        this.paymentContent = [];
        this.cachedFormData = new Option();
        this.expiryMonth = [];
        this.expiryYear = [];
        this.storageObject = { action: '', variable: '', value: null };
        this.modalObject = { type: '', title: '', message: '' };
    }

    ngOnInit() {
        this.getExpiryYear();
    }

    private initializePaymentForm(): void {
        this.paymentForm = this.formBuilder.group({
            cardInformation: this.formBuilder.group({
                nameOnCard: [this.cachedFormData && this.cachedFormData['nameOnCard'] || '', [Validators.required, Validators.minLength(2), Validators.maxLength(20), CustomValidators.characterValidator]],
                cardNumber: [this.cachedFormData && this.cachedFormData['cardNumber'] || '', [Validators.required, Validators.minLength(16), Validators.maxLength(16), CustomValidators.numberValidator]],
                expiryMonth: [this.cachedFormData && this.cachedFormData['expiryMonth'] || 'none', [Validators.required, CustomValidators.dropdownValidator]],
                expiryYear: [this.cachedFormData && this.cachedFormData['expiryYear'] || 'none', [Validators.required, CustomValidators.dropdownValidator]],
                cvv: [this.cachedFormData && this.cachedFormData['cvv'] || '', [Validators.required, Validators.minLength(3), Validators.maxLength(3), CustomValidators.numberValidator]]
            })
        });
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

    public onSaveCardDetails(formValue: FormGroup): void {
        this.storageObject = { action: 'set', variable: 'CardDetails', value: formValue };
        this.sharedService.applyStorage(this.storageObject);
        this.modalObject = {
            type: 'confirmation',
            title: 'confirmation',
            message: 'card details has been saved successfully.'
        };
    }

    ngOnDestroy() {
        this.sharedService.clearStorage();
    }
}
