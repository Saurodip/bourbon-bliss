import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationRoutingModule } from './navigation-routing.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    CommonModule,
    NavigationRoutingModule,
    DialogsModule
  ],
  declarations: [NavigationComponent],
  exports: [NavigationComponent]
})

export class NavigationModule { }
