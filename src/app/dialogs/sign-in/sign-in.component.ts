import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogService } from '../dialogs.service';
import { SignIn } from '../dialogs.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  public signInData: SignIn;
  public error: string;

  constructor(private dialogService: DialogService) {
    this.signInData = new SignIn();
    this.error = '';
  }

  ngOnInit() {
    this.fetchSignInData();
  }

  private fetchSignInData(): void {
    this.dialogService.getSignInData().subscribe(
      (data) => this.signInData = { ...data },
      (error) => this.error = error
    );
  }

  public onSubmit(signInForm: NgForm): void {
    console.log(signInForm);
  }
}

