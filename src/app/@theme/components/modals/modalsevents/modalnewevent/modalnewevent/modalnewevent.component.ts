import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '../../../../../../@core/services/notify/modal.service';
import { Event } from '../../../../../../@core/data/models/event';
import { InfoPersonalService } from '../../../../../../@core/services/infopersonal.service';
import { environment } from '../../../../../../../environments/environment';
import { CreacioneventosService } from '../../../../../../@core/services/creacioneventos.service';
import { AlertService } from '../../../../../../@core/services/notify/alert.service';
import { ToastService } from '../../../../../../@core/services/notify/toast.service';
import { SelectableService } from '../../../../../../@core/services/search/selectable.service';
import moment from 'moment';
import { FuncsService } from '../../../../../../@core/services/funcs.service';
@Component({
  selector: 'app-modalnewevent',
  templateUrl: './modalnewevent.component.html',
  styleUrls: ['./modalnewevent.component.scss'],
})
export class ModalneweventComponent implements OnInit {
  @Input("eventRow") eventRow;

  selectedEvent: Event
  tipoeventos: any
  terceros: any
  ports: any;
  roles: any
  userInfo: any
  selectableUtils: any

  constructor(public modalService: ModalService, public toastService: ToastService, public alertService: AlertService, private readonly infoPersonalService: InfoPersonalService, private creacioneventosService: CreacioneventosService, private selectableService: SelectableService, private funcsService: FuncsService) {
    this.selectableUtils = this.selectableService
    this.selectedEvent = new Event(); // iNICIALIZANDO VARIABLE CON UNA TAREA

    (async () => {
      const terceros = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/tercero?fields=UsuarioWSO2&limit=-1`).toPromise();
      this.terceros = terceros
    })
  }

  async ngOnInit() {

    console.log('here');
    console.log(this.eventRow)

    const dataTipoEventos = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/tipo_evento?limit=-1`).toPromise();
    this.tipoeventos = dataTipoEventos

    if (this.eventRow && this.eventRow.Id) {

      this.selectedEvent = this.eventRow;
      this.selectedEvent["TipoSesion"] = this.eventRow.TipoEventoId.Id.toString();

      // this.selectedEvent["FechaInicio"] =  new Date(this.eventRow.Inicio).toString()
      // this.selectedEvent["FechaFin"] = new Date(this.eventRow.Fin).toISOString();

      // let fechaInicio = new Date(this.eventRow.Inicio).toISOString()
      // console.log('fechaInicio')
      // console.log(fechaInicio)
      // fechaInicio = this.funcsService.isoStrToYYYYMMDDHHSS(fechaInicio)
      this.selectedEvent["FechaInicio"] = this.eventRow.Inicio.split(' ').join('T')

      // let fechaFin = new Date(this.eventRow.Fin).toISOString()
      // fechaFin = this.funcsService.isoStrToYYYYMMDDHHSS(fechaFin)
      this.selectedEvent["FechaFin"] = this.eventRow.Fin.split(' ').join('T')

      console.log('this.selectedEvent', this.selectedEvent);
    }

    // TRAER TERCEROS
    const terceros = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/tercero?fields=UsuarioWSO2,Id&limit=-1`).toPromise();
  }

  init_worked_time() {
    this.selectedEvent.FechaInicio = moment().subtract(50, 'minute').format();
  }

  async submitEvent(form: NgForm) {
    console.log(form);

    let { Nombre, Descripcion, FechaInicio, FechaFin, Lugar, TipoSesion, Invitados } = form.value

    console.log(' \n Nombre:' + Nombre, ' \nDescripcion:' + Descripcion, ' \nFechaInicio:' + FechaInicio, ' \nFechaFin:' + FechaFin, ' \nLugar:' + Lugar, ' \nTipoSesion:' + TipoSesion, Invitados)
    // console.log(typeof FechaInicio)

    console.log(typeof FechaInicio);
    // console.log(FechaInicio.toString())
    // console.log(FechaFin.toString().split('T'))
    // console.log(FechaFin.toString().split('T').join(' '))

    // let test = FechaInicio.toString().split('T').join(' ')
    // console.log(this.funcsService.strToDateTime(test.toString()));
    // console.log(this.funcsService.strToDateTime(test));
    // console.log(this.funcsService.strToDateTime(FechaInicio.toString().split('T').join(' ')).toISOString());
    // return;

    let res: any;

    let eventBody = {
      "Id": null,
      "Nombre": Nombre,
      "Descripcion": Descripcion,
      "EventoPadreId": null,
      // "FechaInicio": this.funcsService.strToDateTimeWithoutSeconds(FechaInicio.split('T').join(' ')).toISOString(),
      // "FechaFin": this.funcsService.strToDateTimeWithoutSeconds(FechaFin.split('T').join(' ')).toISOString(),
      "FechaInicio": this.funcsService.strToDateTimeWithoutSeconds(FechaInicio.split('T').join(' ')).toISOString(),
      "FechaFin": this.funcsService.strToDateTimeWithoutSeconds(FechaFin.split('T').join(' ')).toISOString(),
      "Activo": true,
      "TipoEventoId": {
        "Id": parseInt(TipoSesion)
      },
      "UbicacionId": 0,
      "PosterUrl": ""
    }
    // traer ubicaciones

    if (this.eventRow && this.eventRow.Id) {
      const sesion = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/calendario_evento/${this.eventRow.Id}`).toPromise();
      eventBody["FechaCreacion"] = sesion.FechaCreacion
      eventBody["FechaModificacion"] = sesion.FechaModificacion
      eventBody["Id"] = this.eventRow.Id

      res = await this.creacioneventosService.editEvent(eventBody, this.eventRow.Id).toPromise();

      this.toastService.presentToast("Evento actualizado correctamente")

    } else {
      res = await this.creacioneventosService.createEvent(eventBody).toPromise();
      this.toastService.presentToast("Evento creado correctamente")
    }

    console.log(res)
    this.dismissModal('modal-new-event')

  }

  dismissModal(modalId: any) {
    this.modalService.dismiss(modalId);
  }
}
