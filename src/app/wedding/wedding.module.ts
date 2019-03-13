import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WeddingRoutingModule } from './wedding-routing.module';
import { WeddingContainerComponent } from './container/wedding.container';
import { WeddingComponent } from './container/components/wedding.component';
import { WeddingService } from './wedding.service';

@NgModule({
  imports: [CommonModule, WeddingRoutingModule, SharedModule],
  declarations: [WeddingContainerComponent, WeddingComponent],
  providers: [WeddingService]
})

export class WeddingModule { }
