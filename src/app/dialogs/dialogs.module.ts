import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { DialogService } from './dialogs.service';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [SignInComponent],
    exports: [SignInComponent],
    providers: [DialogService]
})

export class DialogsModule { }
