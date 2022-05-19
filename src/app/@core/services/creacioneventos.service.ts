import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FuncsService } from './funcs.service';

@Injectable({
  providedIn: 'root'
})
export class CreacioneventosService {

  constructor(private readonly httpClient: HttpClient, private funcsService: FuncsService) { }

  createEvent(data) {
    return this.httpClient.post(environment.EVENTOS_ENDPOINT + '/sesion', data, this.funcsService.openIDDefaultOptions())
  }

  editEvent(data, sesionId) {
    return this.httpClient.put(environment.EVENTOS_ENDPOINT + '/sesion/' + sesionId, data, this.funcsService.openIDDefaultOptions())
  }
}
