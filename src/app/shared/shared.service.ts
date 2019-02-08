import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AdditionalInfo, NavigationHistory } from './shared.model';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable()
export class SharedService {
    private url: string;
    public navigationHistory: NavigationHistory;

    constructor(private appService: AppService, private router: Router) {
        this.url = 'assets/data/additional-info.json';
        this.navigationHistory = new NavigationHistory();
    }

    public getAdditionalInformation(): Observable<AdditionalInfo> {
        return this.appService.getRequest(this.url);
    }

    public getFormattedDate(date: Date): string {
        let day: string = String(date.getDate());
        let month: string = String(date.getMonth() + 1);
        let year: string = String(date.getFullYear());

        day = (day.length === 1) ? '0' + day : day;
        month = (month.length === 1) ? '0' + month : month;

        return year + '-' + month + '-' + day;
    }

    public getDateDifference(startDate: string, endDate: string): number {
        let timeDifference: number = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
        let daysDifference: number = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
        return (daysDifference || 1);
    }

    public getRouteUrl(): void {
        let isUrlSet: boolean = false;
        this.navigationHistory.currentMenu = this.router.url && this.router.url.slice(1, this.router.url.length);
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && !isUrlSet) {
                isUrlSet = true;
                this.navigationHistory.previousMenu = this.navigationHistory.currentMenu;
                this.navigationHistory.currentMenu = event.url && event.url.slice(1, event.url.length);
                this.appService.onSharingData(this.navigationHistory, 'navigation');
            }
        });
    }

    public applyStorage(storageObject: object): any {
        if (typeof (Storage)) {
            if (storageObject['action'] === 'get') {
                return JSON.parse(sessionStorage.getItem(storageObject['variable']));
            } else if (storageObject['action'] === 'set') {
                sessionStorage.setItem(storageObject['variable'], JSON.stringify(storageObject['value']));
            }
        } else {
            console.log('Browser does not support Storage feature.');
        }
        storageObject = { action: '', variable: '', value: null };
    }

    public removeStorage(variable: string): void {
        if (typeof (Storage)) {
            sessionStorage.removeItem(variable);
        } else {
            console.log('Browser does not support Storage feature.');
        }
    }

    public clearStorage(): void {
        sessionStorage.clear();
    }
}
