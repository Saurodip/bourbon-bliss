import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Navigation } from './navigation.model';

@Injectable()
export class NavigationService {
    private url: string;

    constructor(private appService: AppService) {
        this.url = 'assets/data/navigation.json';
    }

    public getNavigationData(): Observable<Navigation> {
        return this.appService.getRequest(this.url);
    }
}
