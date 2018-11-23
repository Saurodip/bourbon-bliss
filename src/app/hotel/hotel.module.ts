import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelRoutingModule } from './hotel-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HotelContainerComponent } from './container/hotel.container';
import { HotelComponent } from './container/component/hotel.component';

import { HotelService } from './hotel.service';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule,
    SharedModule
  ],
  declarations: [HotelContainerComponent, HotelComponent],
  exports: [HotelContainerComponent, HotelComponent],
  providers: [HotelService]
})

export class HotelModule { }
