import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Option, CountryList, Field } from '../../booking.model';
import { Availability } from '../../../hotel/hotel.model';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit, AfterViewInit, OnDestroy {
    public viewportWidth: number;
    public reservationContent: Array<Option>;
    public listOfCountries: object;
    public gridColumnClass: string;
    private storageObject: object;
    private cachedFormData: object;
    public selectedItem: Availability;
    private maxAccomodationCount: number;
    private currentDate: string;
    public reservationForm: FormGroup;
    public maxValueForAddGuestInfo: Number;
    public minValueForRemoveGuestInfo: Number;
    private bookingBasis: string;
    private additionalChoice: Array<string>;
    public isModalVisible: boolean;
    public modalObject: object;
    private dateControlArray: Array<object>;

    @Input() set content(value: Array<Option>) {
        if (value) {
            this.reservationContent = value;
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
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.selectedItem = value;
            this.storageObject = { action: 'set', variable: 'SelectedItem', value: this.selectedItem };
            this.sharedService.applyStorage(this.storageObject);
        } else {
            this.storageObject = { action: 'get', variable: 'SelectedItem' };
            this.selectedItem = this.sharedService.applyStorage(this.storageObject);
        }
        this.maxAccomodationCount = this.selectedItem && this.selectedItem['description'].accomodation['count'];
        this.getCalculatedPriceList();
    }

    @ViewChild('input[type=date]') dateControl: ElementRef;

    constructor(private formBuilder: FormBuilder, private sharedService: SharedService) {
        this.viewportWidth = 0;
        this.reservationContent = [];
        this.listOfCountries = {};
        this.gridColumnClass = '';
        this.storageObject = { action: '', variable: '', value: null };
        this.cachedFormData = {};
        this.selectedItem = new Availability();
        this.maxAccomodationCount = 0;
        this.currentDate = this.changeDateFormat(new Date());
        this.reservationForm = this.formBuilder.group({});
        this.maxValueForAddGuestInfo = 3;
        this.minValueForRemoveGuestInfo = 1;
        this.bookingBasis = 'day';
        this.additionalChoice = [];
        this.isModalVisible = false;
        this.modalObject = { type: '', title: '', message: '' };
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
        this.gridColumnClass = this.viewportWidth > 767 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
        this.storageObject = { 'action': 'get', 'variable': 'ReservationFormData' };
        this.cachedFormData = this.sharedService.applyStorage(this.storageObject);
        this.initializeReservationForm();
    }

    ngAfterViewInit() {
        /*this.dateControlArray = this.dateControl.toArray();
        this.dateControl.nativeElement.addEventListener('change', this.getCalculatedPriceList);*/
    }

    private initializeReservationForm(): void {
        this.reservationForm = this.formBuilder.group({
            guestInformation: this.formBuilder.array([]),
            address: this.formBuilder.group({
                blockNo: [this.cachedFormData && this.cachedFormData['address'].blockNo || '', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
                street: [this.cachedFormData && this.cachedFormData['address'].street || '', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
                country: [this.cachedFormData && this.cachedFormData['address'].country || 'none', [Validators.required, CustomValidators.dropdownValidator]],
                state: [this.cachedFormData && this.cachedFormData['address'].state || '', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
                city: [this.cachedFormData && this.cachedFormData['address'].city || '', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
                pinNo: [this.cachedFormData && this.cachedFormData['address'].pinNo || '', [Validators.required, Validators.minLength(3), Validators.maxLength(10), CustomValidators.numberValidator]]
            }),
            contactDetails: this.formBuilder.group({
                mobileNo: [this.cachedFormData && this.cachedFormData['contactDetails'].mobileNo || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10), CustomValidators.numberValidator]],
                emailId: [this.cachedFormData && this.cachedFormData['contactDetails'].emailId || '', [Validators.required, CustomValidators.emailValidator]]
            }),
            checkInOut: this.formBuilder.group({
                checkIn: [this.cachedFormData && this.cachedFormData['checkInOut'].checkIn || this.currentDate, [Validators.required, CustomValidators.startDateValidator]],
                checkOut: [this.cachedFormData && this.cachedFormData['checkInOut'].checkOut || this.currentDate, [Validators.required]],
                totalHours: [this.cachedFormData && this.cachedFormData['checkInOut'].totalHours || 1, [Validators.required]],
                noOfGuest: [this.cachedFormData && this.cachedFormData['checkInOut'].noOfGuest || 1, [Validators.required, Validators.min(1), Validators.max(this.maxAccomodationCount), CustomValidators.numberValidator]]
            }),
            additionalChoice: this.formBuilder.group({
                lateCheckOutFee: [this.cachedFormData && this.cachedFormData['additionalChoice'].lateCheckOutFee || false],
                earlyCheckInFee: [this.cachedFormData && this.cachedFormData['additionalChoice'].earlyCheckInFee || false],
                dogFriendlyRoomFee: [this.cachedFormData && this.cachedFormData['additionalChoice'].dogFriendlyRoomFee || false],
                specialCuisineService: [this.cachedFormData && this.cachedFormData['additionalChoice'].specialCuisineService || false]
            })
        });
        this.getFormGroup();
        this.cachedFormData = {};
    }

    private getFormGroup(): void {
        let guestInformation: FormArray = <FormArray>this.reservationForm.get('guestInformation');
        let formGroup: FormGroup;
        if (this.cachedFormData && this.cachedFormData['guestInformation']) {
            for (let i: number = 0; i < this.cachedFormData['guestInformation'].length; i++) {
                formGroup = this.formBuilder.group({
                    firstName: [this.cachedFormData['guestInformation'][i].firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]],
                    middleName: [this.cachedFormData['guestInformation'][i].middleName, [CustomValidators.characterValidator]],
                    lastName: [this.cachedFormData['guestInformation'][i].lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]]
                });
                guestInformation.push(formGroup);
            }
        } else {
            formGroup = this.formBuilder.group({
                firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]],
                middleName: ['', [CustomValidators.characterValidator]],
                lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]]
            });
            guestInformation.push(formGroup);
        }
    }

    public addOrRemoveGuest(typeOfAction: string): void {
        let guestInformation: FormArray = <FormArray>this.reservationForm.get('guestInformation');
        if (typeOfAction === 'add' && guestInformation.controls.length <= this.maxValueForAddGuestInfo) {
            this.getFormGroup();
        } else if (typeOfAction === 'remove' && guestInformation.controls.length > this.minValueForRemoveGuestInfo) {
            guestInformation.removeAt(guestInformation.controls.length - 1);
        }
    }

    public onSelectBookingBasis(bookingBasis: string): void {
        let group: object = this.reservationContent[0]['options'].find((item: object) => item['group'] === 'checkInOut');
        let isCheckOutControlPresent = group['fields'].find((item: object) => item['control'] === 'checkOut');
        let isTotalHoursControlPresent = group['fields'].find((item: object) => item['control'] === 'totalHours');
        if (!isCheckOutControlPresent) {
            let checkOutObject: object = {
                'icon': 'fas fa-angle-double-right',
                'label': 'check out date',
                'id': 'check-out',
                'type': 'date',
                'control': 'checkOut',
                'isMandatory': true
            };
            group['fields'].splice(1, 0, checkOutObject);
        } else if (!isTotalHoursControlPresent) {
            let totalHoursObject: object = {
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

    public onSelectAdditionalService(event: Event): void {
        if (event && event.currentTarget) {
            let selectedAdditionalChoice: string = event.currentTarget['value'];
            if (event.currentTarget['checked'] && !this.additionalChoice.includes(selectedAdditionalChoice)) {
                this.additionalChoice.push(selectedAdditionalChoice);
            } else {
                let matchedIndex: number = this.additionalChoice.findIndex((item: string) => item === selectedAdditionalChoice);
                this.additionalChoice.splice(matchedIndex, 1);
            }
            this.getCalculatedPriceList();
        }
    }

    public getCalculatedPriceList(): void {
        if (this.reservationContent.length > 0 && this.selectedItem.description) {
            let selectedItemPriceDetails: object = this.selectedItem.description.price.find((item: object) => item['basis'] === this.bookingBasis);
            let priceList: object = this.reservationContent.find((item: object) => item['heading'].text === 'booking price list');
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
                                case 'additionalChoice': (() => {
                                    let additionalServiceAmount: number = 0;
                                    let additionalChoice: object = this.reservationForm.get('additionalChoice').value;
                                    for (let choice in additionalChoice) {
                                        if (additionalChoice[choice]) {
                                            additionalServiceAmount += selectedItemPriceDetails['additionalChoice'][choice];
                                        }
                                    }
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
        let day: string = String(date.getDate());
        let month: string = String(date.getMonth() + 1);
        let year: string = String(date.getFullYear());

        day = (day.length === 1) ? '0' + day : day;
        month = (month.length === 1) ? '0' + month : month;

        return year + '-' + month + '-' + day;
    }

    private getCheckInOutDateDifference(checkInDate: string, checkOutDate: string): number {
        let timeDifference: number = Math.abs(new Date(checkOutDate).getTime() - new Date(checkInDate).getTime());
        let daysDifference: number = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return (daysDifference || 1);
    }

    public resetReservationForm(): void {
        this.reservationForm.reset({
            address: {
                country: 'none'
            },
            checkInOut: {
                checkIn: this.currentDate,
                checkOut: this.currentDate,
                totalHours: 1,
                noOfGuest: 1
            }
        });
        this.reservationForm.setControl('guestInformation', this.formBuilder.array([
            this.getFormGroup()
        ]));
    }

    public onSubmitReservationForm(formValue: FormGroup): void {
        this.storageObject = { action: 'set', variable: 'ReservationFormData', value: formValue };
        this.sharedService.applyStorage(this.storageObject);
        this.isModalVisible = true;
        this.modalObject = {
            type: 'confirmation',
            title: 'confirmation',
            message: 'reservation form data has been saved successfully.'
        };
    }

    ngOnDestroy() {
        this.sharedService.clearStorage();
    }
}
