import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option } from '../../../booking.model';
import { Coupon } from '../../../../offers/offers.model';
import { ModalComponent } from '../../../../shared/components/utilities/modal/modal.component';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';
import { SharedService } from '../../../../shared/shared.service';

@Component({
    selector: 'app-default-reservation',
    templateUrl: './default-reservation.component.html',
    styleUrls: ['./default-reservation.component.scss']
})

export class DefaultReservationComponent implements OnInit, OnDestroy {
    public viewportWidth: number;
    public defaultReservationContent: Array<Option>;
    public selectedOption: Coupon;
    private cachedFormData: Option;
    private storageObject: object;
    public modalObject: object;
    public reservationForm: FormGroup;

    @Input() set selectedItem(value: Coupon) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.selectedOption = value;
            this.storageObject = { action: 'set', variable: 'SelectedCoupon', value: this.selectedOption };
            this.sharedService.applyStorage(this.storageObject);
        } else {
            this.storageObject = { action: 'get', variable: 'SelectedCoupon' };
            this.selectedOption = this.sharedService.applyStorage(this.storageObject);
        }
    }
    @Input() set content(value: Array<Option>) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.defaultReservationContent = value;
        } else {
            this.storageObject = { action: 'get', variable: 'UserDetails' };
            this.cachedFormData = this.sharedService.applyStorage(this.storageObject);
        }
        this.initializeCouponForm();
    }
    @Input() routedFrom: string;
    @Input() gridColumnClass: string;
    @Output() saveDefaultReservationForm = new EventEmitter<boolean>();
    @ViewChild(ModalComponent) private modalComponent: ModalComponent;

    constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private customValidatorsService: CustomValidatorsService) {
        this.viewportWidth = 0;
        this.defaultReservationContent = [];
        this.selectedOption = new Coupon();
        this.cachedFormData = new Option();
        this.storageObject = { action: '', variable: '', value: null };
        this.modalObject = { type: '', title: '', message: '' };
    }

    ngOnInit() {
    }

    private initializeCouponForm(): void {
        this.reservationForm = this.formBuilder.group({
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
        this.reservationForm.reset();
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
        this.saveDefaultReservationForm.emit(true);
    }

    ngOnDestroy() {
        this.sharedService.removeStorage('SelectedCoupon');
        this.sharedService.removeStorage('UserDetails');
    }
}