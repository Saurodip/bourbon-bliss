import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../navigation.service';
import { SharedService } from '../../shared/shared.service';
import { AppService } from '../../app.service';
import { Navigation } from '../navigation.model';
import { NavigationHistory } from '../../shared/shared.model';

@Component({
  selector: 'app-navigation-container',
  templateUrl: './navigation.container.html',
  styleUrls: ['./navigation.container.scss']
})

export class NavigationContainerComponent implements OnInit {
  public viewportWidth: number;
  public navigationData: Navigation;
  public navigationHistory: NavigationHistory;
  public error: string;

  public navigationData$: Observable<Navigation> = this.navigationService.getNavigationData();

  constructor(private navigationService: NavigationService, private sharedService: SharedService, private appService: AppService) {
    this.viewportWidth = 0;
    this.navigationData = new Navigation();
    this.navigationHistory = new NavigationHistory();
    this.error = '';
  }

  ngOnInit() {
    this.viewportWidth = window.outerWidth;
    this.fetchNavigationData();
    this.getNavigationHistory();
  }

  private fetchNavigationData(): void {
    this.navigationService.getNavigationData().subscribe(
      (data) => this.navigationData = { ...data },
      (error) => this.error = error
    );
  }

  private getNavigationHistory(): void {
    this.sharedService.getRouteUrl();
    this.appService.navigationSharedData$.subscribe(
      (data) => this.navigationHistory = { ...data },
      (error) => this.error = error
    );
  }

  public onChangeNavigation(): void {
    this.sharedService.getRouteUrl();
  }
}
