import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Navigation } from '../../navigation.model';
import { NavigationHistory } from '../../../shared/shared.model';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
    public viewportWidth: number;
    public navigationContent: Navigation;
    public navigationHistory: NavigationHistory;
    private storageObject: object;
    private cachedPreviousMenu: string;

    @Input() set content(value: Navigation) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.navigationContent = value;
        }
    }
    @Input() set routeHistory(value: NavigationHistory) {
        if (value && Object.getOwnPropertyNames(value).length !== 0) {
            this.navigationHistory = value;
            if (this.navigationHistory && this.navigationHistory.currentMenu === 'booking') {
                this.storageObject = { action: 'get', variable: 'PreviousRoute' };
                this.cachedPreviousMenu = this.sharedService.applyStorage(this.storageObject);
                if (this.cachedPreviousMenu) {
                    this.navigationHistory.currentMenu = this.cachedPreviousMenu;
                } else {
                    this.navigationHistory['currentMenu'] = this.navigationHistory['previousMenu'];
                    this.storageObject = { 'action': 'set', variable: 'PreviousRoute', value: this.navigationHistory['previousMenu'] };
                    this.sharedService.applyStorage(this.storageObject);
                }
            }
        }
    }
    @Output() changeNavigation = new EventEmitter<any>();

    constructor(private sharedService: SharedService) {
        this.viewportWidth = 0;
        this.navigationContent = new Navigation();
        this.navigationHistory = new NavigationHistory();
        this.storageObject = { action: '', variable: '', value: null };
        this.cachedPreviousMenu = '';
    }

    ngOnInit() {
        this.viewportWidth = window.outerWidth;
    }

    public navigateTo(): void {
        this.sharedService.removeStorage('PreviousRoute');
        this.changeNavigation.emit();
    }
}
