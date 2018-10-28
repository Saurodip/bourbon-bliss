import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerReview } from '../dialogs.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  public customerReview: Array<CustomerReview>;

  constructor() {
    this.customerReview = [];
  }

  ngOnInit() {
    this.customerReview = [
      {
        'path': 'ft-img-1.svg',
        'heading': 'trusted by over 8m+ happy travellers',
        'description': 'book with one of most trusted travel portals in india'
      },
      {
        'path': 'ft-img-2.svg',
        'heading': 'lower price guarentee',
        'description': 'find a better price on any online travel site, we refund you double the difference amount!'
      },
      {
        'path': 'ft-img-3.svg',
        'heading': '24 X 7 customer support',
        'description': 'round the clock support for all your hotel needs'
      },
      {
        'path': 'ft-img-4.svg',
        'heading': '750000+ verified traveller reviews',
        'description': 'find the hotel that best suits your needs'
      }
    ];
  }

  public onSubmit(signInForm: NgForm): void {
    console.log(signInForm);
  }
}

