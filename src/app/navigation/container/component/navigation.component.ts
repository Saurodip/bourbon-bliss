import { Component, OnInit, Input } from '@angular/core';
import { Navigation } from '../../navigation.model';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
    public viewportWidth: number;
    public currentIndex: number;
    public navigationContent: Navigation;

    @Input() set content(value: Navigation) {
        if (value) {
            this.navigationContent = value;
        }
    }

    constructor() {
        this.viewportWidth = 0;
        this.currentIndex = 0;
        this.navigationContent = new Navigation();
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
    }

    public navigateTo(menuIndex: number): void {
        this.currentIndex = menuIndex;
    }
}
