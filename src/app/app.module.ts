import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { AppService } from './app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NavigationModule, RouterModule, SharedModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})

export class AppModule { }
