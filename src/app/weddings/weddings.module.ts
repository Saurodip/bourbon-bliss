import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingsRoutingModule } from './weddings-routing.module';
import { WeddingsComponent } from './weddings.component';

@NgModule({
  imports: [
    CommonModule,
    WeddingsRoutingModule
  ],
  declarations: [WeddingsComponent]
})
export class WeddingsModule { }
