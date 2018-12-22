import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Option, CountryList } from '../../booking.model';
import { Availability } from '../../../hotel/hotel.model';
import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit {
    public viewportWidth: number;
    public bookingContent: Option;
    public listOfCountries: Object;
    public gridColumnClass: string;
    public selectedItem: Availability;
    private currentDate: string;
    public reservationForm: FormGroup;
    public maxValueForAddGuestInfo: Number;
    public minValueForRemoveGuestInfo: Number;

    @Input() set content(value: Option) {
        if (value) {
            this.bookingContent = value;
        }
    }
    @Input() set countryList(value: CountryList) {
        if (value) {
            this.listOfCountries = value.list;
        }
    }
    @Input() set selectedOption(value: Availability) {
        if (value) {
            this.selectedItem = value;
        }
    }

    constructor(private formBuilder: FormBuilder) {
        this.viewportWidth = 0;
        this.bookingContent = new Option();
        this.listOfCountries = {};
        this.gridColumnClass = '';
        this.currentDate = this.changeDateFormat(new Date());
        this.reservationForm = this.formBuilder.group({
            guestInformation: this.formBuilder.array([
                this.getFormGroup()
            ]),
            address: this.formBuilder.group({
                blockNo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
                street: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
                country: ['none', [Validators.required, CustomValidators.dropdownValidator]],
                state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
                city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
                pinNo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), CustomValidators.numberValidator]]
            }),
            contactDetails: this.formBuilder.group({
                mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), CustomValidators.numberValidator]],
                emailId: ['', [Validators.required, CustomValidators.emailValidator]]
            }),
            checkInOut: this.formBuilder.group({
                checkIn: [this.currentDate, [Validators.required, CustomValidators.startDateValidator]],
                checkOut: [this.currentDate, [Validators.required]],
                noOfGuest: [1, [Validators.required, Validators.min(1), Validators.max(12), CustomValidators.numberValidator]]
            }),
            additionalChoice: this.formBuilder.group({
                lateCheckOut: [''],
                earlyCheckIn: [''],
                dogRoomFee: [''],
                cuisineServiceCharge: ['']
            })
        });
        this.maxValueForAddGuestInfo = 3;
        this.minValueForRemoveGuestInfo = 1;
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
        this.gridColumnClass = this.viewportWidth > 767 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
    }

    private changeDateFormat(date: Date): string {
        let day = String(date.getDate());
        let month = String(date.getMonth() + 1);
        let year = String(date.getFullYear());

        day = (day.length === 1) ? '0' + day : day;
        month = (month.length === 1) ? '0' + month : month;

        return year + '-' + month + '-' + day;
    }

    public addOrRemoveGuest(typeOfAction: string): void {
        let guestInformation: FormArray = <FormArray>this.reservationForm.get('guestInformation');
        if (typeOfAction === 'add' && guestInformation.controls.length <= this.maxValueForAddGuestInfo) {
            guestInformation.push(this.getFormGroup());
        } else if (typeOfAction === 'remove' && guestInformation.controls.length > this.minValueForRemoveGuestInfo) {
            guestInformation.removeAt(guestInformation.controls.length - 1);
        }
        console.log(this.reservationForm)
    }

    private getFormGroup(): FormGroup {
        let guestInfoFormGroup = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]],
            middleName: ['', [CustomValidators.characterValidator]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]]
        });
        return guestInfoFormGroup;
    }
}

