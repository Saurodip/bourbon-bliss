import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';

import { SharedService } from './shared.service';

@NgModule({
  imports: [CommonModule],
  declarations: [AdditionalInfoComponent],
  exports: [AdditionalInfoComponent],
  providers: [SharedService]
})

export class SharedModule { }
