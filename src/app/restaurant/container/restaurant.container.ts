import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurants, Restaurant } from '../restaurant.model';
import { RestaurantService } from '../restaurant.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-restaurant-container',
  templateUrl: './restaurant.container.html',
  styleUrls: ['./restaurant.container.scss']
})

export class RestaurantContainerComponent implements OnInit {
  public restaurantData: Restaurants;
  public error: string;

  public restaurantData$: Observable<Restaurants> = this.restaurantService.getRestaurantData();

  constructor(private router: Router, private restaurantService: RestaurantService, private sharedService: SharedService) {
    this.error = '';
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchRestaurantData();
  }

  private fetchRestaurantData(): void {
    this.restaurantService.getRestaurantData().subscribe(
      (data) => this.restaurantData = { ...data },
      (error) => this.error = error
    );
  }

  public bookSelectedRestaurant(restaurant: Restaurant): void {
    this.router.navigate(['/booking']);
    this.sharedService.getRouteUrl();
    this.restaurantService.setDataForSharing(restaurant);
  }
}
