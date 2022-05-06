import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreacioneventosService {

  constructor(private readonly httpClient: HttpClient) { }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
      }),
    };
  }

  createEvent(data) {
    return this.httpClient.post(environment.EVENTOS_ENDPOINT + '/sesion', data, this.getOptions())
  }

  editEvent(data, sesionId) {
    return this.httpClient.put(environment.EVENTOS_ENDPOINT + '/sesion/' + sesionId, data, this.getOptions())
  }
}
