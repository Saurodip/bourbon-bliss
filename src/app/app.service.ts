import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
    public httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
        })
    };
    public sharedNavigationData$ = new BehaviorSubject<any>([]);
    public sharedSelectedHotelData$ = new BehaviorSubject<any>([]);
    public sharedSelectedItemData$ = new BehaviorSubject<any>([]);

    constructor(private httpClient: HttpClient) { }

    public getRequest(api: string): Observable<any> {
        return this.httpClient.get<any>(api).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    public postRequest(api: string, body: any): Observable<any> {
        return this.httpClient.post<any>(api, body, this.httpOptions).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    public deleteRequest(api: string): Observable<any> {
        return this.httpClient.delete<any>(api, this.httpOptions).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    public putRequest(api: string, body: any): Observable<any> {
        return this.httpClient.put<any>(api, body, this.httpOptions).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    public handleError(response: HttpErrorResponse) {
        if (response.error instanceof ErrorEvent) {
            console.log('Client-side or network error occurred: ' + response.error.message);
        } else {
            console.log('Server error occurred. Status Code: ' + response.status + '\nMessage:\n' + response.error);
        }
        return throwError('Something went wrong! Please try later.');
    }

    public onSharingData(data: any, from: string): void {
        switch (from) {
            case 'navigation': this.sharedNavigationData$.next(data);
                break;
            case 'hotel': this.sharedSelectedHotelData$.next(data);
                break;
            default: this.sharedSelectedItemData$.next(data);
                break;
        }
    }

    public sharedData(from: string): Observable<any> {
        switch (from) {
            case 'navigation': return this.sharedNavigationData$.asObservable();
            case 'hotel': return this.sharedSelectedHotelData$.asObservable();
            default: return this.sharedSelectedItemData$.asObservable();
        }
    }
}

