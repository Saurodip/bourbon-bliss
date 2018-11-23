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
}
