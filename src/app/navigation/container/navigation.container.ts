import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../navigation.service';
import { Navigation } from '../navigation.model';

@Component({
  selector: 'app-navigation-container',
  templateUrl: './navigation.container.html',
  styleUrls: ['./navigation.container.scss']
})

export class NavigationContainerComponent implements OnInit {
  public viewportWidth: number;
  public navigationData: Navigation;
  public currentIndex: number;
  public error: string;

  public navigationData$: Observable<Navigation> = this.navigationService.getNavigationData();

  constructor(private navigationService: NavigationService) {
    this.viewportWidth = 0;
    this.navigationData = new Navigation();
    this.currentIndex = 0;
    this.error = '';
  }

  ngOnInit() {
    this.viewportWidth = window.outerWidth;
    this.fetchNavigationData();
  }

  private fetchNavigationData(): void {
    this.navigationService.getNavigationData().subscribe(
      (data) => this.navigationData = { ...data },
      (error) => this.error = error
    );
  }

  public navigateTo(menuIndex: number): void {
    this.currentIndex = menuIndex;
  }
}
