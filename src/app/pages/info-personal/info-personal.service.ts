import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError({
      status: error.status,
      message: 'Something bad happened; please try again later.',
    });
};

@Injectable({
    providedIn: 'root',
})
export class InfoPersonalService {
    constructor(
        private readonly httpClient : HttpClient
    ) {

     }
     private getOptions(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
            }),
        };
     }

    getIndentification(endpoint, data) {
        return this.httpClient.post(endpoint,data, this.getOptions()).pipe(
            catchError(handleError),
        );
    }

    getInformationByDocument(endpoint, document) {
        return this.httpClient.get(endpoint+`?query=Numero:${document}`, this.getOptions()).pipe(
            catchError(handleError),
        );
    }


}
