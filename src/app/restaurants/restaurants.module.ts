import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';

@NgModule({
  imports: [
    CommonModule,
    RestaurantsRoutingModule
  ],
  declarations: [RestaurantsComponent]
})
export class RestaurantsModule { }
