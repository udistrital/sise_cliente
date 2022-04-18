import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ImplicitAutenticationService } from '../utils/implicit_autentication.service';
import { environment } from 'src/environments/environment';


export const handleError = (error: HttpErrorResponse) => {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    // console.log(error)
    // console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    // console.error(
    //   `Backend returned code ${error.status}, ` +
    //   `body was: ${error.error}`);
    // console.log(error)

  }

  return error;
  // return an observable with a user-facing error message
  // return throwError({
  //   status: error,
  //   message: 'Something bad happened; please try again later.',
  // });
};

@Injectable({
  providedIn: 'root',
})

export class InfoPersonalService {
  private autenticacion = new ImplicitAutenticationService;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
      }),
    };
  }

  createTercero(endpoint, data) {
    return this.httpClient.post(endpoint, data, this.getOptions())
  }

  getDocumentIdByEmail(endpoint, data) {
    return this.httpClient.post(endpoint, data, this.getOptions())
  }

  getInformationByDocument(endpoint, document) {
    return this.httpClient.get(endpoint + `?query=Numero:${document}`, this.getOptions())
  }

  getInfoComplementariaTercero(endpoint, params) {
    return this.httpClient.get(endpoint + params, this.getOptions())
  }

  getDocumentTypes(endpoint) {
    return this.httpClient.get(endpoint, this.getOptions())
  }

  updateInformation(endpoint, data) {
    return this.httpClient.put(endpoint, data, this.getOptions())
  }

  async getTerceroId() {
    const { email } = this.autenticacion.getPayload()
    const { documento } = await this.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, { "user": email }).toPromise() as any;

    if (!documento) {
      console.error("Something went wrong, when try to get the identification");
      return
    }

    const data = await this.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()
    const Id = data[0].TerceroId.Id as number;
    return Id
  }
}
