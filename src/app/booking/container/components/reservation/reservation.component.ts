import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/utilities/modal/modal.component';
import { Option, CountryList, Field } from '../../../booking.model';
import { Availability } from '../../../../hotel/hotel.model';
import { CustomValidatorsService } from '../../../../shared/validators/custom-validators.service';
import { SharedService } from '../../../../shared/shared.service';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit, OnDestroy {
    public viewportWidth: number;
    public selectedItem: Availability;
    public listOfCountries: object;
    public gridColumnClass: string;
    private storageObject: object;
    private cachedFormData: object;
    private maxAccomodationCount: number;
    public reservationContent: Array<Option>;
    private currentDate: string;
    public reservationForm: FormGroup;
    public minValueForRemoveGuestInfo: Number;
    private bookingBasis: string;
    private checkInDate: string;
    private checkOutDate: string;
    public isModalVisible: boolean;
    public modalObject: object;

    @Input() set countryList(value: CountryList) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
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
    @Input() set content(value: Array<Option>) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.reservationContent = value;
            this.onSelectBookingBasis('day');
            this.getCalculatedPriceList();
        }
    }
    @ViewChild(ModalComponent) private modalComponent: ModalComponent;

    constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private customValidatorsService: CustomValidatorsService) {
        this.viewportWidth = 0;
        this.selectedItem = new Availability();
        this.listOfCountries = {};
        this.gridColumnClass = '';
        this.storageObject = { action: '', variable: '', value: null };
        this.cachedFormData = {};
        this.maxAccomodationCount = 0;
        this.reservationContent = [];
        this.currentDate = this.sharedService.getFormattedDate(new Date());
        this.reservationForm = this.formBuilder.group({});
        this.minValueForRemoveGuestInfo = 1;
        this.bookingBasis = 'day';
        this.checkInDate = this.currentDate;
        this.checkOutDate = this.currentDate;
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

    private initializeReservationForm(): void {
        this.reservationForm = this.formBuilder.group({
            guestInformation: this.formBuilder.array([]),
            address: this.formBuilder.group({
                blockNo: [this.cachedFormData && this.cachedFormData['address'].blockNo || '', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
                street: [this.cachedFormData && this.cachedFormData['address'].street || '', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
                country: [this.cachedFormData && this.cachedFormData['address'].country || 'none', [Validators.required, this.customValidatorsService.dropdownValidator]],
                state: [this.cachedFormData && this.cachedFormData['address'].state || '', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
                city: [this.cachedFormData && this.cachedFormData['address'].city || '', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
                pinNo: [this.cachedFormData && this.cachedFormData['address'].pinNo || '', [Validators.required, Validators.minLength(3), Validators.maxLength(10), this.customValidatorsService.numberValidator]]
            }),
            contactDetails: this.formBuilder.group({
                mobileNo: [this.cachedFormData && this.cachedFormData['contactDetails'].mobileNo || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.customValidatorsService.numberValidator]],
                emailId: [this.cachedFormData && this.cachedFormData['contactDetails'].emailId || '', [Validators.required, this.customValidatorsService.emailValidator]]
            }),
            checkInOut: this.formBuilder.group({
                checkIn: [this.cachedFormData && this.cachedFormData['checkInOut'].checkIn || this.currentDate, [Validators.required, this.customValidatorsService.startDateValidator(this.checkOutDate)]],
                checkOut: [this.cachedFormData && this.cachedFormData['checkInOut'].checkOut || this.currentDate, [Validators.required, this.customValidatorsService.endDateValidator(this.checkInDate)]],
                totalHours: [this.cachedFormData && this.cachedFormData['checkInOut'].totalHours || 1, [Validators.required, Validators.min(1), Validators.max(12)]],
                noOfGuest: [this.cachedFormData && this.cachedFormData['checkInOut'].noOfGuest || 1, [Validators.required, Validators.min(1), Validators.max(this.maxAccomodationCount), this.customValidatorsService.numberValidator]]
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

    get guestInformation(): FormArray {
        if (this.reservationForm && this.reservationForm.get('guestInformation')) {
            return <FormArray>this.reservationForm.get('guestInformation');
        }
    }

    get checkIn(): FormControl {
        if (this.reservationForm && this.reservationForm.get('checkInOut')) {
            return this.reservationForm.get('checkInOut')['controls'].checkIn;
        }
    }

    get checkOut(): FormControl {
        if (this.reservationForm && this.reservationForm.get('checkInOut')) {
            return this.reservationForm.get('checkInOut')['controls'].checkOut;
        }
    }

    get totalHours(): FormControl {
        if (this.reservationForm && this.reservationForm.get('checkInOut')) {
            return this.reservationForm.get('checkInOut')['controls'].totalHours;
        }
    }

    get additionalChoice(): FormGroup {
        if (this.reservationForm && this.reservationForm.get('additionalChoice')) {
            return <FormGroup>this.reservationForm.get('additionalChoice');
        }
    }

    private getFormGroup(): void {
        let guestInformation: FormArray = this.guestInformation;
        let formGroup: FormGroup;
        if (this.cachedFormData && this.cachedFormData['guestInformation']) {
            for (let i: number = 0; i < this.cachedFormData['guestInformation'].length; i++) {
                formGroup = this.formBuilder.group({
                    firstName: [this.cachedFormData['guestInformation'][i].firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(15), this.customValidatorsService.characterValidator]],
                    middleName: [this.cachedFormData['guestInformation'][i].middleName, [this.customValidatorsService.characterValidator]],
                    lastName: [this.cachedFormData['guestInformation'][i].lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(15), this.customValidatorsService.characterValidator]]
                });
                guestInformation.push(formGroup);
            }
        } else {
            formGroup = this.formBuilder.group({
                firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), this.customValidatorsService.characterValidator]],
                middleName: ['', [this.customValidatorsService.characterValidator]],
                lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), this.customValidatorsService.characterValidator]]
            });
            guestInformation.push(formGroup);
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
        this.prepareTooltipContent();
    }

    public addOrRemoveGuest(typeOfAction: string): void {
        let guestInformation: FormArray = this.guestInformation;
        if (typeOfAction === 'add' && guestInformation.controls.length < this.maxAccomodationCount) {
            this.getFormGroup();
        } else if (typeOfAction === 'remove' && guestInformation.controls.length > this.minValueForRemoveGuestInfo) {
            guestInformation.removeAt(guestInformation.controls.length - 1);
        }
    }

    public onFormControlChange(event: Event): void {
        if (event && event.currentTarget) {
            switch (event.currentTarget['id']) {
                case 'check-in': (() => {
                    this.checkIn.valueChanges.subscribe((date: string) => {
                        if (this.checkInDate !== date) {
                            this.checkInDate = date;
                            this.checkIn.setValidators(Validators.compose([Validators.required, this.customValidatorsService.startDateValidator(this.checkOutDate)]));
                        }
                    });
                    this.getCalculatedPriceList();
                })();
                    break;
                case 'check-out': (() => {
                    this.checkOut.valueChanges.subscribe((date: string) => {
                        if (this.checkInDate !== date) {
                            this.checkOutDate = date;
                            this.checkOut.setValidators(Validators.compose([Validators.required, this.customValidatorsService.endDateValidator(this.checkInDate)]));
                        }
                    });
                    this.getCalculatedPriceList();
                })();
                    break;
                case 'total-hours': (() => {
                    this.getCalculatedPriceList();
                })();
                    break;
                default:
                    break;
            }
        }
    }

    public onSelectAdditionalService(): void {
        this.getCalculatedPriceList();
    }

    private prepareTooltipContent(): void {
        if (this.selectedItem && this.reservationContent && this.reservationContent.length > 0) {
            let priceInfo: object = this.selectedItem.description.price.find((item: object) => item['basis'] === this.bookingBasis);
            if (priceInfo) {
                let additionalChoiceInfo = this.reservationContent.find((item: object) => item['heading'].text === 'additional choice');
                if (additionalChoiceInfo) {
                    additionalChoiceInfo['options'][0].fields.forEach((item: object) => {
                        item['tooltip'] += priceInfo['additionalChoice'][item['control']] + '.';
                        item['disabled'] = priceInfo['additionalChoice'][item['control']] <= 0 ? true : false;
                    });
                }
                let priceListInfo = this.reservationContent.find((item: object) => item['heading'].text === 'booking price list');
                if (priceListInfo) {
                    priceListInfo['options'][0].fields.forEach((item: object) => {
                        switch (item['control']) {
                            case 'basePrice': item['tooltip'] = 'base price: ' + priceInfo['currency'] + ' ' + priceInfo[item['control']] + ' x duration (per day/hour)';
                                break;
                            case 'discountPercentage': item['tooltip'] = 'base price x ' + priceInfo[item['control']] + '%';
                                break;
                            case 'serviceTaxPercentage': item['tooltip'] = 'base price x ' + priceInfo[item['control']] + '%';
                                break;
                            case 'additionalChoice': item['tooltip'] = 'charges for additional services that you wish to avail.';
                                break;
                            default:
                                break;
                        }
                    });
                }
            }
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
                                        let checkInDate = this.checkIn.value;
                                        let checkOutDate = this.checkOut.value;
                                        count = this.sharedService.getDateDifference(checkInDate, checkOutDate);
                                    } else if (this.bookingBasis === 'hour') {
                                        let duration = (this.totalHours.value > 0) ? this.totalHours.value : 1;
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
                                    let additionalChoice: object = this.additionalChoice.value;
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
            },
        });
        let guestInformation: FormArray = this.guestInformation;
        guestInformation.controls = [];
        this.getFormGroup();
        this.getCalculatedPriceList();
        this.sharedService.removeStorage('ReservationFormData');
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
        this.modalComponent.onShowModalPopover();
    }

    ngOnDestroy() {
        this.sharedService.removeStorage('SelectedItem');
        this.sharedService.removeStorage('ReservationFormData');
    }
}
