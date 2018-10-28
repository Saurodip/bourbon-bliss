import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [SignInComponent],
    exports: [SignInComponent]
})

export class DialogsModule { }
