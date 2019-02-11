import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option, Month, MonthInfo } from '../../../booking.model';
import { ModalComponent } from '../../../../shared/components/utilities/modal/modal.component';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';
import { SharedService } from '../../../../shared/shared.service';
import { Coupon } from 'src/app/offers/offers.model';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupon.component.html',
    styleUrls: ['./coupon.component.scss']
})

export class CouponComponent implements OnInit, OnDestroy {
    public viewportWidth: number;
    public couponContent: Array<Option>;
    public selectedItem: Coupon;
    private cachedFormData: Option;
    private storageObject: object;
    public modalObject: object;
    public couponForm: FormGroup;

    @Input() set content(value: Array<Option>) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.couponContent = value;
        } else {
            this.storageObject = { action: 'get', variable: 'UserDetails' };
            this.cachedFormData = this.sharedService.applyStorage(this.storageObject);
        }
        this.initializeCouponForm();
    }
    @Input() set selectedCoupon(value: Coupon) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.selectedItem = value;
            this.storageObject = { action: 'set', variable: 'SelectedItem', value: this.selectedItem };
            this.sharedService.applyStorage(this.storageObject);
        } else {
            this.storageObject = { action: 'get', variable: 'SelectedItem' };
            this.selectedItem = this.sharedService.applyStorage(this.storageObject);
        }
    }
    @ViewChild(ModalComponent) private modalComponent: ModalComponent;

    constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private customValidatorsService: CustomValidatorsService) {
        this.viewportWidth = 0;
        this.couponContent = [];
        this.selectedItem = new Coupon();
        this.cachedFormData = new Option();
        this.storageObject = { action: '', variable: '', value: null };
        this.modalObject = { type: '', title: '', message: '' };
    }

    ngOnInit() {
    }

    private initializeCouponForm(): void {
        this.couponForm = this.formBuilder.group({
            userInformation: this.formBuilder.group({
                firstName: [this.cachedFormData && this.cachedFormData['userInformation'].firstName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(15), this.customValidatorsService.characterValidator]],
                middleName: [this.cachedFormData && this.cachedFormData['userInformation'].middleName || '', [this.customValidatorsService.characterValidator]],
                lastName: [this.cachedFormData && this.cachedFormData['userInformation'].lastName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(15), this.customValidatorsService.characterValidator]],
            }),
            contactDetails: this.formBuilder.group({
                mobileNo: [this.cachedFormData && this.cachedFormData['contactDetails'].mobileNo || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.customValidatorsService.numberValidator]],
                emailId: [this.cachedFormData && this.cachedFormData['contactDetails'].emailId || '', [Validators.required, this.customValidatorsService.emailValidator]]
            })
        });
    }

    public resetCouponForm(): void {
        this.couponForm.reset();
        this.sharedService.removeStorage('UserDetails');
    }

    public onSaveUserDetails(formValue: FormGroup): void {
        this.storageObject = { action: 'set', variable: 'UserDetails', value: formValue };
        this.sharedService.applyStorage(this.storageObject);
        this.modalObject = {
            type: 'confirmation',
            title: 'confirmation',
            message: 'user details has been saved successfully.'
        };
        this.modalComponent.onShowModalPopover();
    }

    ngOnDestroy() {
        this.sharedService.removeStorage('UserDetails');
    }
}
