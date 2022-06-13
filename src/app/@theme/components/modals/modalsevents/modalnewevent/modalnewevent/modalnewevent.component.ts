import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '../../../../../../@core/services/notify/modal.service';
import { Event } from '../../../../../../@core/data/models/event';
import { InfoPersonalService } from '../../../../../../@core/services/infopersonal.service';
import { environment } from '../../../../../../../environments/environment';
import { CreacioneventosService } from '../../../../../../@core/services/creacioneventos.service';
import { AlertService } from '../../../../../../@core/services/notify/alert.service';
import { ToastService } from '../../../../../../@core/services/notify/toast.service';
import { SelectableService } from 'src/app/@core/services/search/selectable.service';

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
  selectableUtils:any

  constructor(public modalService: ModalService, public toastService: ToastService, public alertService: AlertService, private readonly infoPersonalService: InfoPersonalService, private creacioneventosService: CreacioneventosService, private selectableService: SelectableService) {
    this.selectableUtils = this.selectableService
    this.selectedEvent = new Event(); // iNICIALIZANDO VARIABLE CON UNA TAREA

    (async () => {
      const terceros = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/tercero?fields=UsuarioWSO2&limit=-1`).toPromise();
      this.terceros = terceros
    })
  }

  async ngOnInit() {

    
    if (this.eventRow && this.eventRow.Id) {

      this.selectedEvent = this.eventRow; // cargar la tarea en el formulario para poder editar
      // console.log('this.selectedEvent["FechaInicio"]', this.selectedEvent);
      // console.log('this.eventRow["FechaInicio"]', this.eventRow);
      this.selectedEvent["FechaInicio"] = new Date(this.eventRow.inicio).toISOString();
      this.selectedEvent["FechaFin"] = new Date(this.eventRow.fin).toISOString();
      const dataTipoEventos = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/tipo_sesion?limit=-1`).toPromise();
      this.tipoeventos = dataTipoEventos
      this.selectedEvent["TipoSesion"] = this.eventRow.tipo.Id.toString();
      console.log('this.selectedEvent', this.selectedEvent);
    }
    
    // TRAER TERCEROS
    const terceros = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/tercero?fields=UsuarioWSO2,Id&limit=-1`).toPromise();
    // this.terceros = terceros
    // TERCEROS_SERVICE + '/tercero'
    // console.log(terceros)
    let roles = [], userInfoArr = [], userInfo;
    // if (terceros && terceros.length > 0) {
    //   terceros.map(async tercero => {
    //     if (tercero.UsuarioWSO2) {
    //       let body = {
    //         "user": tercero.UsuarioWSO2
    //       }
    //       userInfo = await this.infoPersonalService.traerUserInfo(environment.API_GET_IDENTIFICATION, body).toPromise();
    //       roles = roles.concat(userInfo.role)
    //       userInfoArr.push(userInfo)
    //     }
    //   })

    //   this.roles = [...new Set(roles)]
    //   console.log('this.roles')
    //   console.log(this.roles)
    // }

    // console.log('this.roles')
    // console.log(this.roles)

    // console.log('terceros')
    // console.log(this.terceros)
    // console.log(terceros)
    // TRAER ROLES
  }

  async submitEvent(form: NgForm) {
    console.log(form);

    let { Descripcion, FechaInicio, FechaFin, Lugar, TipoSesion, Invitados } = form.value

    // if(!Descripcion || !FechaInicio || !FechaFin || !Lugar || !TipoSesion || !Invitados){

    // }

    console.log(' \nDescripcion:' + Descripcion, ' \nFechaInicio:' + FechaInicio, ' \nFechaFin:' + FechaFin, ' \nLugar:' + Lugar, ' \nTipoSesion:' + TipoSesion, Invitados)
    console.log(typeof FechaInicio)

    let res: any;
    let eventBody = {
      "Id": null,
      "Descripcion": Descripcion,
      "Lugar": Lugar,
      "FechaInicio": new Date(FechaInicio).toISOString(),
      "FechaFin": new Date(FechaFin).toISOString(),
      "TipoSesion": {
        "Id": parseInt(TipoSesion)
      }
    }

    if (this.eventRow && this.eventRow.Id) {
      const sesion = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/sesion/${this.eventRow.Id}`).toPromise();
      eventBody["FechaCreacion"] = sesion.FechaCreacion
      eventBody["FechaModificacion"] = sesion.FechaModificacion
      delete eventBody.Id

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
