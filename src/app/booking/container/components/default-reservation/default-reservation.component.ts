import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option, TimeSlot, Content } from '../../../booking.model';
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
    public defaultReservationContent: Array<Content>;
    public timeSlots: TimeSlot;
    public selectedOption: Object;
    private cachedFormData: Option;
    private currentDate: string;
    private storageObject: object;
    public modalObject: object;
    public reservationForm: FormGroup;

    @Input() set selectedItem(value: Object) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.selectedOption = value;
            this.storageObject = { action: 'set', variable: 'SelectedOption', value: this.selectedOption };
            this.sharedService.applyStorage(this.storageObject);
        } else {
            this.storageObject = { action: 'get', variable: 'SelectedOption' };
            this.selectedOption = this.sharedService.applyStorage(this.storageObject);
        }
    }
    @Input() set content(value: Array<Content>) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.defaultReservationContent = value;
            if (this.routedFrom !== 'restaurants') {
                this.defaultReservationContent.forEach((item: Content) => {
                    let index = item['options'].findIndex((element: Option) => element.group === 'dateAndTime');
                    item['options'].splice(index, 1);
                });
            }
        } else {
            this.storageObject = { action: 'get', variable: 'UserDetails' };
            this.cachedFormData = this.sharedService.applyStorage(this.storageObject);
        }
        this.initializeCouponForm();
    }
    @Input() set time(value: TimeSlot) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.timeSlots = value;
        }
    }
    @Input() routedFrom: string;
    @Input() gridColumnClass: string;
    @Output() saveDefaultReservationForm = new EventEmitter<boolean>();
    @ViewChild(ModalComponent) private modalComponent: ModalComponent;

    constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private customValidatorsService: CustomValidatorsService) {
        this.viewportWidth = 0;
        this.defaultReservationContent = [];
        this.timeSlots = new TimeSlot();
        this.selectedOption = {};
        this.cachedFormData = new Option();
        this.currentDate = this.sharedService.getFormattedDate(new Date());
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
            }),
            dateAndTime: this.formBuilder.group({
                date: [this.cachedFormData && this.cachedFormData['dateAndTime'].date || this.currentDate, [this.customValidatorsService.endDateValidator(this.currentDate)]],
                time: [this.cachedFormData && this.cachedFormData['dateAndTime'].time || 'none', []]
            })
        });
    }

    public resetCouponForm(): void {
        this.reservationForm.reset({
            dateAndTime: {
                date: this.currentDate,
                time: 'none'
            }
        });
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
        if (this.routedFrom === 'restaurants') {
            this.modalObject['message'] = 'table has been booked successfully.';
        }
        this.modalComponent.onShowModalPopover();
        this.saveDefaultReservationForm.emit(true);
    }

    ngOnDestroy() {
        this.sharedService.removeStorage('SelectedOption');
        this.sharedService.removeStorage('UserDetails');
    }
}
