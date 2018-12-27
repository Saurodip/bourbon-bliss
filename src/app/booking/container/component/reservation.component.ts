import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Content, Option, CountryList, Field } from '../../booking.model';
import { Availability } from '../../../hotel/hotel.model';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { isNgTemplate } from '@angular/compiler';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit, OnDestroy {
    public viewportWidth: number;
    public bookingContent: Array<Option>;
    public listOfCountries: Object;
    public gridColumnClass: string;
    public selectedItem: Availability;
    private currentDate: string;
    public reservationForm: FormGroup;
    public maxValueForAddGuestInfo: Number;
    public minValueForRemoveGuestInfo: Number;
    private bookingBasis: string;
    private additionalService: Array<string>;

    @Input() set content(value: Array<Option>) {
        if (value) {
            this.bookingContent = value;
            this.onSelectBookingBasis('day');
            this.getCalculatedPriceList();
        }
    }
    @Input() set countryList(value: CountryList) {
        if (value) {
            this.listOfCountries = value.list;
        }
    }
    @Input() set selectedOption(value: Availability) {
        let storageObject: object = { action: '', variable: 'SelectedItem' };
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.selectedItem = value;
            storageObject['action'] = 'set';
            this.applyStorage(storageObject);
        } else {
            storageObject['action'] = 'get';
            this.applyStorage(storageObject);
        }
        this.getCalculatedPriceList();
    }

    constructor(private formBuilder: FormBuilder) {
        this.viewportWidth = 0;
        this.bookingContent = [];
        this.listOfCountries = {};
        this.gridColumnClass = '';
        this.selectedItem = new Availability();
        this.currentDate = this.changeDateFormat(new Date());
        this.reservationForm = this.formBuilder.group({});
        this.maxValueForAddGuestInfo = 3;
        this.minValueForRemoveGuestInfo = 1;
        this.bookingBasis = 'day';
        this.additionalService = [];
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
        this.gridColumnClass = this.viewportWidth > 767 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
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
                totalHours: [1, [Validators.required]],
                noOfGuest: [1, [Validators.required, Validators.min(1), Validators.max(12), CustomValidators.numberValidator]]
            }),
            additionalChoice: this.formBuilder.group({
                lateCheckOut: [''],
                earlyCheckIn: [''],
                dogRoomFee: [''],
                cuisineServiceCharge: ['']
            })
        });
    }

    private applyStorage(storageObject: object): void {
        if (typeof (Storage)) {
            if (storageObject['action'] === 'get') {
                this.selectedItem = JSON.parse(sessionStorage.getItem(storageObject['variable']));
            } else if (storageObject['action'] === 'set') {
                sessionStorage.setItem(storageObject['variable'], JSON.stringify(this.selectedItem));
            }
        } else {
            console.log('Browser does not support Storage functionality.');
        }
    }

    public onSelectBookingBasis(bookingBasis: string): void {
        let group: object = this.bookingContent[0]['options'].find((item: object) => item['group'] === 'checkInOut');
        let isCheckOutControlPresent = group['fields'].find((item: object) => item['control'] === 'checkOut');
        let isTotalHoursControlPresent = group['fields'].find((item: object) => item['control'] === 'totalHours');
        if (!isCheckOutControlPresent) {
            let checkOutObject = {
                'icon': 'fas fa-angle-double-right',
                'label': 'check out date',
                'id': 'check-out',
                'type': 'date',
                'control': 'checkOut',
                'isMandatory': true
            };
            group['fields'].splice(1, 0, checkOutObject);
        } else if (!isTotalHoursControlPresent) {
            let totalHoursObject = {
                'icon': 'fas fa-angle-double-right',
                'label': 'total hours',
                'id': 'total-hours',
                'type': 'number',
                'control': 'totalHours',
                'isMandatory': true
            };
            group['fields'].splice(2, 0, totalHoursObject);
        }
        if (bookingBasis === 'day') {
            group['fields'].splice(2, 1);
        } else if (bookingBasis === 'hour') {
            group['fields'].splice(1, 1);
        }
        this.bookingBasis = bookingBasis;
    }

    public addOrRemoveGuest(typeOfAction: string): void {
        let guestInformation: FormArray = <FormArray>this.reservationForm.get('guestInformation');
        if (typeOfAction === 'add' && guestInformation.controls.length <= this.maxValueForAddGuestInfo) {
            guestInformation.push(this.getFormGroup());
        } else if (typeOfAction === 'remove' && guestInformation.controls.length > this.minValueForRemoveGuestInfo) {
            guestInformation.removeAt(guestInformation.controls.length - 1);
        }
    }

    public onSelectAdditionalService(event: Event): void {
        if (event && event.currentTarget) {
            let selectedAdditionalService: string = event.currentTarget['value'];
            if (event.currentTarget['checked'] && !this.additionalService.includes(selectedAdditionalService)) {
                this.additionalService.push(selectedAdditionalService);
            } else {
                let matchedIndex: number = this.additionalService.findIndex((service: string) => service === selectedAdditionalService);
                this.additionalService.splice(matchedIndex, 1);
            }
            this.getCalculatedPriceList();
        }
    }

    private getFormGroup(): FormGroup {
        let guestInfoFormGroup = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]],
            middleName: ['', [CustomValidators.characterValidator]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]]
        });
        return guestInfoFormGroup;
    }

    public getCalculatedPriceList(): void {
        if (this.bookingContent.length > 0 && this.selectedItem.description) {
            let selectedItemPriceDetails: object = this.selectedItem.description.price.find((item: object) => item['basis'] === this.bookingBasis);
            let priceList: object = this.bookingContent.find((item: object) => item['heading'].text === 'booking price list');
            let amount: number;
            priceList['options'].forEach((option: Option) => {
                option['fields'].forEach((field: Field) => {
                    field['currency'] = selectedItemPriceDetails ? selectedItemPriceDetails['currency'] : '';
                    if (field['control'] !== 'totalAmount') {
                        let matchedItem = Object.keys(selectedItemPriceDetails).find(item => item === field['control']);
                        if (matchedItem) {
                            switch (matchedItem) {
                                case 'basePrice': (() => {
                                    let count: number;
                                    if (this.bookingBasis === 'day') {
                                        let checkInDate = this.reservationForm.get('checkInOut')['controls'].checkIn.value;
                                        let checkOutDate = this.reservationForm.get('checkInOut')['controls'].checkOut.value;
                                        count = this.getCheckInOutDateDifference(checkInDate, checkOutDate);
                                    } else if (this.bookingBasis === 'hour') {
                                        let duration = this.reservationForm.get('checkInOut')['controls'].totalHours.value;
                                        count = duration;
                                    }
                                    amount = selectedItemPriceDetails[matchedItem] * count;
                                    field['value'] = amount;
                                })();
                                    break;
                                case 'discountPercentage': (() => {
                                    let discountAmount: number = (amount * selectedItemPriceDetails[matchedItem]) / 100;
                                    field['value'] = -discountAmount;
                                })();
                                    break;
                                case 'serviceTaxPercentage': (() => {
                                    let serviceTaxAmount: number = (amount * selectedItemPriceDetails[matchedItem]) / 100;
                                    field['value'] = serviceTaxAmount;
                                })();
                                    break;
                                case 'additionalService': (() => {
                                    let additionalServiceAmount: number = 0;
                                    this.additionalService.forEach((service: string) => {
                                        additionalServiceAmount += selectedItemPriceDetails['additionalService'][service];
                                    });
                                    field['value'] = additionalServiceAmount;
                                })();
                                    break;
                                default:
                                    break;
                            }
                        }
                    } else {
                        let totalAmount: number = 0;
                        option['fields'].forEach((optionField: Field, index: number) => {
                            if (index < option['fields'].length - 1) {
                                totalAmount += optionField['value'];
                            }
                        });
                        field['value'] = totalAmount;
                    }
                });
            });
        }
    }

    private changeDateFormat(date: Date): string {
        let day = String(date.getDate());
        let month = String(date.getMonth() + 1);
        let year = String(date.getFullYear());

        day = (day.length === 1) ? '0' + day : day;
        month = (month.length === 1) ? '0' + month : month;

        return year + '-' + month + '-' + day;
    }

    private getCheckInOutDateDifference(checkInDate: string, checkOutDate: string): number {
        let timeDifference = Math.abs(new Date(checkOutDate).getTime() - new Date(checkInDate).getTime());
        let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return (daysDifference || 1);
    }

    ngOnDestroy() {
        sessionStorage.removeItem('SelectedItem');
    }
}

