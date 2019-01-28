import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Offers } from '../offers.model';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offers-container',
  templateUrl: './offers.container.html',
  styleUrls: ['./offers.container.scss']
})

export class OffersContainerComponent implements OnInit {
  public offersData: Offers;
  public error: string;

  public offersData$: Observable<Offers> = this.offersService.getOffersData();

  constructor(private offersService: OffersService) {
    this.error = '';
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchOffersData();
  }

  private fetchOffersData(): void {
    this.offersService.getOffersData().subscribe(
      (data) => this.offersData = { ...data },
      (error) => this.error = error
    );
  }
}


