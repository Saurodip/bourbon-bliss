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
    public hotelSharedData$ = new BehaviorSubject<any>([]);
    public navigationSharedData$ = new BehaviorSubject<any>([]);
    public couponSharedData$ = new BehaviorSubject<any>([]);
    public weddingSharedData$ = new BehaviorSubject<any>([]);

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
            case 'hotel': this.hotelSharedData$.next(data);
                break;
            case 'navigation': this.navigationSharedData$.next(data);
                break;
            case 'coupon': this.couponSharedData$.next(data);
                break;
            case 'wedding': this.weddingSharedData$.next(data);
                break;
            default:
                break;
        }
    }

    public sharedData(from: string): Observable<any> {
        switch (from) {
            case 'hotel': return this.hotelSharedData$.asObservable();
            case 'navigation': return this.navigationSharedData$.asObservable();
            case 'coupon': return this.couponSharedData$.asObservable();
            case 'wedding': return this.weddingSharedData$.asObservable();
            default:
                break;
        }
    }
}

