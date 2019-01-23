import { Injectable } from '@angular/core';
import { AdditionalInfo } from './shared.model';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable()
export class SharedService {
    private url: string;

    constructor(private appService: AppService) {
        this.url = 'assets/data/additional-info.json';
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

    public clearStorage(): void {
        sessionStorage.clear();
    }
}
