import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationRoutingModule } from './navigation-routing.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { NavigationService } from './navigation.service';
import { NavigationContainerComponent } from './container/navigation.container';
import { NavigationComponent } from './container/component/navigation.component';

@NgModule({
  imports: [CommonModule, NavigationRoutingModule, DialogsModule],
  declarations: [NavigationContainerComponent, NavigationComponent],
  exports: [NavigationContainerComponent, NavigationComponent],
  providers: [NavigationService]
})

export class NavigationModule { }
