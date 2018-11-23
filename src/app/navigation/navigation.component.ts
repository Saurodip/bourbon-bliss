import { Component, OnInit, ElementRef } from '@angular/core';
import { Navigation } from './navigation.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public viewportWidth: number;
  public navMenuItems: Array<Navigation>;
  public currentIndex: number;
  public guestServices: Array<string>;

  constructor(private elementRef: ElementRef) {
    this.viewportWidth = 0;
    this.navMenuItems = [];
    this.currentIndex = 0;
    this.guestServices = [];
  }

  ngOnInit() {
    this.viewportWidth = window.outerWidth;

    this.navMenuItems = [
      {
        'icon': 'fas fa-hotel',
        'name': 'hotel'
      },
      {
        'icon': 'fas fa-money-bill',
        'name': 'entertainment'
      },
      {
        'icon': 'fas fa-utensils',
        'name': 'restaurants'
      },
      {
        'icon': 'fas fa-cocktail',
        'name': 'nightlife'
      },
      {
        'icon': 'fas fa-concierge-bell',
        'name': 'amenities'
      },
      {
        'icon': 'fas fa-dollar-sign',
        'name': 'casino'
      },
      {
        'icon': 'fas fa-heart',
        'name': 'weddings'
      },
      {
        'icon': 'fas fa-box-open',
        'name': 'offers'
      }
    ];

    this.guestServices = [
      'find reservation',
      'mobile check-in',
      'mobile check-out',
      'offers sign-up',
      'manage preferences',
      'contact us'
    ];
  }

  public navigateTo(menuIndex: number): void {
    this.currentIndex = menuIndex;
  }
}
