import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { SignIn } from './dialogs.model';

@Injectable()
export class DialogService {
    private url: Array<string>;

    constructor(private appService: AppService) {
        this.url = ['assets/data/sign-in.json'];
    }

    public getSignInData(): Observable<SignIn> {
        return this.appService.getRequest(this.url[0]);
    }
}
