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
    return this.httpClient.post(environment.EVENTOS_ENDPOINT + '/calendario_evento', data, this.funcsService.openIDDefaultOptions())
  }

  editEvent(data, sesionId) {
    return this.httpClient.put(environment.EVENTOS_ENDPOINT + '/calendario_evento/' + sesionId, data, this.funcsService.openIDDefaultOptions())
  }

  getEventById(eventId){
    return this.httpClient.get(environment.EVENTOS_ENDPOINT + `/calendario_evento?query=Id:${eventId}`, this.funcsService.openIDDefaultOptions())
  }
}
