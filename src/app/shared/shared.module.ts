import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { PreloaderComponent } from './components/preloader/preloader.component';

import { SharedService } from './shared.service';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  declarations: [AdditionalInfoComponent, PreloaderComponent],
  exports: [AdditionalInfoComponent, PreloaderComponent],
  providers: [SharedService]
})

export class SharedModule { }
