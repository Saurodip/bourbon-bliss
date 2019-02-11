import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offers, Coupon } from '../offers.model';
import { OffersService } from '../offers.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-offers-container',
  templateUrl: './offers.container.html',
  styleUrls: ['./offers.container.scss']
})

export class OffersContainerComponent implements OnInit {
  public offersData: Offers;
  public error: string;

  public offersData$: Observable<Offers> = this.offersService.getOffersData();

  constructor(private router: Router, private offersService: OffersService, private sharedService: SharedService) {
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

  public purchaseSelectedCoupon(coupon: Coupon): void {
    this.router.navigate(['/booking']);
    this.sharedService.getRouteUrl();
    this.offersService.setDataForSharing(coupon);
  }
}


