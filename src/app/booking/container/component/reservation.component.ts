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
    private reservationFormData: object;
    public listOfCountries: object;
    public gridColumnClass: string;
    private storageObject: object;
    public selectedItem: Availability;
    private currentDate: string;
    public reservationForm: FormGroup;
    public maxValueForAddGuestInfo: Number;
    public minValueForRemoveGuestInfo: Number;
    private bookingBasis: string;
    private additionalService: Array<string>;
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
        this.getCalculatedPriceList();
    }

    @ViewChild('input[type=date]') dateControl: ElementRef;

    constructor(private formBuilder: FormBuilder, private sharedService: SharedService) {
        this.viewportWidth = 0;
        this.reservationContent = [];
        this.reservationFormData = {};
        this.listOfCountries = {};
        this.gridColumnClass = '';
        this.storageObject = { action: '', variable: '', value: null };
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
        this.storageObject = { 'action': 'get', 'variable': 'ReservationFormData' };
        let cachedFormData = this.sharedService.applyStorage(this.storageObject);
        this.reservationFormData = {
            guestInformation: cachedFormData && cachedFormData['guestInformation'] || [{ firstName: '', middleName: '', lastName: '' }],
            address: {
                blockNo: cachedFormData && cachedFormData['address'].blockNo || '',
                street: cachedFormData && cachedFormData['address'].street || '',
                country: cachedFormData && cachedFormData['address'].country || 'none',
                state: cachedFormData && cachedFormData['address'].state || '',
                city: cachedFormData && cachedFormData['address'].city || '',
                pinNo: cachedFormData && cachedFormData['address'].pinNo || ''
            },
            contactDetails: {
                mobileNo: cachedFormData && cachedFormData['contactDetails'].mobileNo || '',
                emailId: cachedFormData && cachedFormData['contactDetails'].emailId || ''
            },
            checkInOut: {
                checkIn: cachedFormData && cachedFormData['checkInOut'].checkIn || this.currentDate,
                checkOut: cachedFormData && cachedFormData['checkInOut'].checkOut || this.currentDate,
                totalHours: cachedFormData && cachedFormData['checkInOut'].totalHours || 1,
                noOfGuest: cachedFormData && cachedFormData['checkInOut'].noOfGuest || 1
            },
            additionalChoice: {
                lateCheckOut: cachedFormData && cachedFormData['additionalChoice'].lateCheckOut || '',
                earlyCheckIn: cachedFormData && cachedFormData['additionalChoice'].earlyCheckIn || '',
                dogRoomFee: cachedFormData && cachedFormData['additionalChoice'].dogRoomFee || '',
                cuisineServiceCharge: cachedFormData && cachedFormData['additionalChoice'].cuisineServiceCharge || ''
            }
        };
        this.initializeReservationForm();
    }

    ngAfterViewInit() {
        /*this.dateControlArray = this.dateControl.toArray();
        this.dateControl.nativeElement.addEventListener('change', this.getCalculatedPriceList);*/
    }

    private initializeReservationForm(): void {
        this.reservationForm = this.formBuilder.group({
            guestInformation: this.formBuilder.array([
                this.getFormGroup()
            ]),
            address: this.formBuilder.group({
                blockNo: [this.reservationFormData['address'].blockNo, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
                street: [this.reservationFormData['address'].street, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
                country: [this.reservationFormData['address'].country, [Validators.required, CustomValidators.dropdownValidator]],
                state: [this.reservationFormData['address'].state, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
                city: [this.reservationFormData['address'].city, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
                pinNo: [this.reservationFormData['address'].pinNo, [Validators.required, Validators.minLength(3), Validators.maxLength(10), CustomValidators.numberValidator]]
            }),
            contactDetails: this.formBuilder.group({
                mobileNo: [this.reservationFormData['contactDetails'].mobileNo, [Validators.required, Validators.minLength(10), Validators.maxLength(10), CustomValidators.numberValidator]],
                emailId: [this.reservationFormData['contactDetails'].emailId, [Validators.required, CustomValidators.emailValidator]]
            }),
            checkInOut: this.formBuilder.group({
                checkIn: [this.reservationFormData['checkInOut'].checkIn, [Validators.required, CustomValidators.startDateValidator]],
                checkOut: [this.reservationFormData['checkInOut'].checkOut, [Validators.required]],
                totalHours: [this.reservationFormData['checkInOut'].totalHours, [Validators.required]],
                noOfGuest: [this.reservationFormData['checkInOut'].noOfGuest, [Validators.required, Validators.min(1), Validators.max(12), CustomValidators.numberValidator]]
            }),
            additionalChoice: this.formBuilder.group({
                lateCheckOut: [this.reservationFormData['additionalChoice'].lateCheckOut],
                earlyCheckIn: [this.reservationFormData['additionalChoice'].earlyCheckIn],
                dogRoomFee: [this.reservationFormData['additionalChoice'].dogRoomFee],
                cuisineServiceCharge: [this.reservationFormData['additionalChoice'].cuisineServiceCharge]
            })
        });
    }

    private getFormGroup(): FormGroup {
        let guestInfoFormGroup: Array<FormGroup> = [];
        for (let i = 0; i < this.reservationFormData['guestInformation'].length; i++) {
            let formGroup = this.formBuilder.group({
                firstName: [this.reservationFormData['guestInformation'][i].firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]],
                middleName: [this.reservationFormData['guestInformation'][i].middleName, [CustomValidators.characterValidator]],
                lastName: [this.reservationFormData['guestInformation'][i].lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(15), CustomValidators.characterValidator]]
            });
            guestInfoFormGroup.push(formGroup);
        }
        return guestInfoFormGroup[0];
    }

    public addOrRemoveGuest(typeOfAction: string): void {
        let guestInformation: FormArray = <FormArray>this.reservationForm.get('guestInformation');
        if (typeOfAction === 'add' && guestInformation.controls.length <= this.maxValueForAddGuestInfo) {
            guestInformation.push(this.getFormGroup()[guestInformation.controls.length]);
        } else if (typeOfAction === 'remove' && guestInformation.controls.length > this.minValueForRemoveGuestInfo) {
            guestInformation.removeAt(guestInformation.controls.length - 1);
        }
    }

    public onSelectBookingBasis(bookingBasis: string): void {
        let group: object = this.reservationContent[0]['options'].find((item: object) => item['group'] === 'checkInOut');
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
    }

    ngOnDestroy() {
        this.sharedService.clearStorage();
    }
}

