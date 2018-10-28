import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntertainmentRoutingModule } from './entertainment-routing.module';
import { EntertainmentComponent } from './entertainment.component';

@NgModule({
  imports: [
    CommonModule,
    EntertainmentRoutingModule
  ],
  declarations: [EntertainmentComponent]
})
export class EntertainmentModule { }
