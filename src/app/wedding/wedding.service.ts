import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wedding } from '../wedding/wedding.model';
import { AppService } from '../app.service';

@Injectable()
export class WeddingService {
    private url: string;

    constructor(private appService: AppService) {
        this.url = 'assets/data/wedding.json';
    }

    public getWeddingData(): Observable<Wedding> {
        return this.appService.getRequest(this.url);
    }
}
