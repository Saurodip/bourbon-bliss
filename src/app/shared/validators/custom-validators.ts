import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static characterValidator(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value || control.value.match(/^[A-Za-z]+$/)) {
            return null;
        } else {
            return { characterValidator: true };
        }
    }

    static numberValidator(control: AbstractControl): { [key: string]: any } | null {
        if (isNaN(control.value)) {
            return { numberValidator: true };
        } else {
            return null;
        }
    }

    static dropdownValidator(control: AbstractControl): { [key: string]: any } | null {
        if (control.value !== 'none') {
            return null;
        } else {
            return { dropdownValidator: true };
        }
    }

    static emailValidator(control: AbstractControl): { [key: string]: any } | null {
        if (control.value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            return null;
        } else {
            return { emailValidator: true };
        }
    }

    static minDateValidator(control: AbstractControl): { [key: string]: any } | null {
        let selectedDate = new Date(control.value);
        let currentDate = new Date();
        if (selectedDate.getTime() < currentDate.getTime()) {
            return { minDateValidator: true };
        } else {
            return null;
        }
    }
}
