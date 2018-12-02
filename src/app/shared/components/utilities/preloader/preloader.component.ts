import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss']
})

export class PreloaderComponent implements OnInit {
    public showPreloader: boolean;

    constructor(private router: Router) {
        this.showPreloader = false;
        this.router.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationStart) {
                this.showPreloader = true;
            }
            if (routerEvent instanceof NavigationEnd) {
                this.showPreloader = false;
            }
        });
    }

    ngOnInit() {
    }
}
