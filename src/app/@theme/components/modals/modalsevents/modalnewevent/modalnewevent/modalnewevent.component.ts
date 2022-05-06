import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '../../../../../../@core/services/modal.service';
import { Event } from '../../../../../../@core/data/models/event';
import { InfoPersonalService } from '../../../../../../@core/services/infopersonal.service';
import { environment } from '../../../../../../../environments/environment';
import { CreacioneventosService } from '../../../../../../@core/services/creacioneventos.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';

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
  tercerosSubscription: Subscription;

  constructor(public modalService: ModalService, private readonly infoPersonalService: InfoPersonalService, private creacioneventosService: CreacioneventosService) {
    this.selectedEvent = new Event(); // iNICIALIZANDO VARIABLE CON UNA TAREA
    // this.ports = [
    //   { id: 1, name: 'Tokai' },
    //   { id: 2, name: 'Vladivostok' },
    //   { id: 3, name: 'Navlakhi' }
    // ];
    (async () => {
      const terceros = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/tercero?fields=UsuarioWSO2&limit=-1`).toPromise();
      this.terceros = terceros
    })
    // this.terceros = this.modalService.getTerceros()
  }

  async ngOnInit() {

    if(this.eventRow && this.eventRow.Id) {

      console.log('this.selectedEvent');
      console.log(this.selectedEvent);
      // console.log(this.eventRow);
      this.selectedEvent = this.eventRow; // cargar la tarea en el formulario para poder editar
    }


    const dataTipoEventos = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/tipo_sesion?limit=-1`).toPromise();
    this.tipoeventos = dataTipoEventos

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

    if (this.eventRow.Id) {
      const sesion = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/sesion/${this.eventRow.Id}`).toPromise();

      console.log('sesion')
      console.log(sesion)

      eventBody["FechaCreacion"] = sesion.FechaCreacion
      eventBody["FechaModificacion"] = sesion.FechaModificacion
      delete eventBody.Id

      res = await this.creacioneventosService.editEvent(eventBody, this.eventRow.Id).toPromise();
    } else {
      res = await this.creacioneventosService.createEvent(eventBody).toPromise();
    }

    console.log(res)
    this.dismissModal('modal-new-event')
  }

  specificGuestsChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('VALUE SELECTABLE:', event.value);
  }

  dismissModal(modalId: any) {
    this.modalService.dismiss(modalId);
  }

  filterTerceros(terceros: any[], text: string) {
    console.log(terceros)
    return terceros.filter(tercero => {
      return tercero.UsuarioWSO2.toLowerCase().indexOf(text) !== -1 ||
        tercero.UsuarioWSO2.toLowerCase().indexOf(text) !== -1 ||
        tercero.Id.toString().toLowerCase().indexOf(text) !== -1;
    });
  }

  searchTerceros(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    console.log(event)
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.tercerosSubscription) {
      this.tercerosSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.tercerosSubscription) {
        this.tercerosSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.tercerosSubscription = this.modalService.getTercerosAsync().subscribe(terceross => {
      // Subscription will be closed when unsubscribed manually.
      if (this.tercerosSubscription.closed) {
        return;
      }

      event.component.items = this.filterTerceros(terceross, text);
      event.component.endSearch();
    });
  }

}
