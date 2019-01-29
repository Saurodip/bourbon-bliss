import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { HotelPanelComponent } from './components/utilities/panel/hotel/hotel-panel.component';
import { ModalComponent } from './components/utilities/modal/modal.component';
import { PreloaderComponent } from './components/utilities/preloader/preloader.component';
import { TooltipComponent } from './components/utilities/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { SharedService } from './shared.service';
import { CustomValidatorsService } from './validators/custom-validators.service';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  declarations: [AdditionalInfoComponent, HotelPanelComponent, ModalComponent, PreloaderComponent, TooltipComponent, TooltipDirective],
  exports: [AdditionalInfoComponent, HotelPanelComponent, ModalComponent, PreloaderComponent, TooltipComponent, TooltipDirective],
  providers: [SharedService, CustomValidatorsService]
})

export class SharedModule { }
