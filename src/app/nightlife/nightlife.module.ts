import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NightlifeRoutingModule } from './nightlife-routing.module';
import { NightlifeComponent } from './nightlife.component';

@NgModule({
  imports: [
    CommonModule,
    NightlifeRoutingModule
  ],
  declarations: [NightlifeComponent]
})
export class NightlifeModule { }
