import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitiesRoutingModule } from './amenities-routing.module';
import { AmenitiesComponent } from './amenities.component';

@NgModule({
  imports: [
    CommonModule,
    AmenitiesRoutingModule
  ],
  declarations: [AmenitiesComponent]
})
export class AmenitiesModule { }
