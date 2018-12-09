import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Option, CountryList } from '../../booking.model';
import { Availability } from 'src/app/hotel/hotel.model';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {
    public viewportWidth: number;
    public bookingContent: Option;
    public listOfCountries: Object;
    public gridColumnClass: string;
    public selectedItem: Availability;
    public reservationForm: FormGroup;

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
        this.reservationForm = this.formBuilder.group({
            guestInformation: this.formBuilder.group({
                firstName: ['asdasdasdsa', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
                middleName: [''],
                lastName: ['asadsadsad', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]]
            }),
            address: this.formBuilder.group({
                blockNo: ['asads', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
                street: ['sdasdsadasdsadasdsad', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
                country: ['none', Validators.required],
                state: ['asadasdas', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
                city: ['aadasd', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
                pinNo: ['0898989', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
            }),
            checkInOut: this.formBuilder.group({
                checkIn: ['2018-12-11', Validators.required],
                checkOut: [new Date(), Validators.required],
                noOfGuest: [1, [Validators.required, Validators.min(1), Validators.max(15)]]
            }),
            additionalChoice: this.formBuilder.group({
                lateCheckOut: [''],
                earlyCheckIn: [''],
                dogRoomFee: [''],
                cuisineServiceCharge: ['']
            })
        });
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
        this.gridColumnClass = this.viewportWidth > 767 ? 'col-xs-12 col-sm-4 horizontal-view' : 'col-xs-12 vertical-view';
        console.log(this.reservationForm);
    }
}
