import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantContainerComponent } from './container/restaurant.container';
import { RestaurantComponent } from './container/components/restaurant.component';
import { RestaurantService } from './restaurant.service';

@NgModule({
  imports: [CommonModule, RestaurantRoutingModule, SharedModule],
  declarations: [RestaurantContainerComponent, RestaurantComponent],
  providers: [RestaurantService]
})

export class RestaurantModule { }
