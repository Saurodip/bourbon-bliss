import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Wedding, MarriageHall } from '../wedding.model';
import { WeddingService } from '../wedding.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-wedding-container',
  templateUrl: './wedding.container.html',
  styleUrls: ['./wedding.container.scss']
})
export class WeddingContainerComponent implements OnInit {
  public weddingData: Wedding;
  public error: string;

  public weddingData$: Observable<Wedding> = this.weddingService.getWeddingData();

  constructor(private router: Router, private weddingService: WeddingService, private sharedService: SharedService) {
    this.error = '';
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchWeddingData();
  }

  private fetchWeddingData(): void {
    this.weddingService.getWeddingData().subscribe(
      (data) => this.weddingData = { ...data },
      (error) => this.error = error
    );
  }

  public purchaseSelectedCoupon(marriageHall: MarriageHall): void {
    this.router.navigate(['/booking']);
    this.sharedService.getRouteUrl();
    // this.offersService.setDataForSharing(coupon);
  }
}
