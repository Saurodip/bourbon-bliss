import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable()
export class CustomValidatorsService {
    constructor(private sharedService: SharedService) {}

    public characterValidator(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value || control.value.match(/^[A-Za-z ]+$/)) {
            return null;
        } else {
            return { characterValidator: true };
        }
    }

    public numberValidator(control: AbstractControl): { [key: string]: any } | null {
        if (isNaN(control.value)) {
            return { numberValidator: true };
        } else {
            return null;
        }
    }

    public dropdownValidator(control: AbstractControl): { [key: string]: any } | null {
        if (control.value !== 'none') {
            return null;
        } else {
            return { dropdownValidator: true };
        }
    }

    public emailValidator(control: AbstractControl): { [key: string]: any } | null {
        if (control.value && control.value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            return null;
        } else {
            return { emailValidator: true };
        }
    }

    public startDateValidator(endDate: string): ValidatorFn {
        let self = this;
        return function (control: AbstractControl): { [key: string]: any } | null {
            let startDate: string = control.value;
            let currentDate: string = self.sharedService.getFormattedDate(new Date());
            if (startDate < currentDate || startDate > endDate) {
                return { startDateValidator: true };
            } else {
                return null;
            }
        };
    }

    public endDateValidator(startDate: string): ValidatorFn {
        return function (control: AbstractControl): { [key: string]: any } | null {
            let endDate: string = control.value;
            if (endDate < startDate) {
                return { endDateValidator: true };
            } else {
                return null;
            }
        };
    }
}
