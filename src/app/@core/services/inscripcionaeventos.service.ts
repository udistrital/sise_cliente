import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuncsService } from 'src/app/@core/services/funcs.service';
import { environment } from '../../../environments/environment';

export interface Guest {
  Id: null;
  EncargadoId: number;
  Activo: boolean;
  CalendarioEventoId: OEventoID;
  RolEncargadoEventoId: OEventoID;
}

export interface OEventoID {
  Id: number;
}
@Injectable({
  providedIn: 'root'
})

export class InscripcionaeventosService {

  constructor(private readonly httpClient: HttpClient, private funcsService: FuncsService) { }

  enrollGuest(data: Guest) {
    return this.httpClient.post(environment.EVENTOS_ENDPOINT + '/encargado_evento', data, this.funcsService.openIDDefaultOptions())
  }

  getGuestsByEventId(eventId: number | string):any {
    return this.httpClient.get(
      environment.EVENTOS_ENDPOINT + `/encargado_evento?query=CalendarioEventoId.Id:${eventId}&fields=EncargadoId,RolEncargadoEventoId`,
      this.funcsService.openIDDefaultOptions())
  }

  getGuestByEventIdAndTerceroId({eventId, terceroId}: { eventId: string | number, terceroId: string | number}):any {
    return this.httpClient.get(
      environment.EVENTOS_ENDPOINT + `/encargado_evento?query=CalendarioEventoId.Id:${eventId},EncargadoId:${terceroId}&fields=EncargadoId,RolEncargadoEventoId`,
      this.funcsService.openIDDefaultOptions())
  }
}
