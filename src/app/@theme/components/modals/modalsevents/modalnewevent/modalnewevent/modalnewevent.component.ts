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
import { LoaderService } from '../../../../../../@core/services/notify/loader.service';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { MatSelectModule } from '@angular/material/select';
declare var $: any;

@Component({
  selector: 'app-modalnewevent',
  templateUrl: './modalnewevent.component.html',
  styleUrls: ['./modalnewevent.component.scss'],
})

export class ModalneweventComponent implements OnInit {
  @Input("eventRow") eventRow;

  selectedEvent: Event
  tipoeventos: any
  ubicaciones: any
  ubicacionesTiposLugar: any
  direccionesTiposLugar: any
  typeEventPlace: any
  terceros: any
  ports: any;
  roles: any
  userInfo: any
  selectableUtils: any
  selectedCar: number;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  constructor(
    public modalService: ModalService,
    public toastService: ToastService,
    public alertService: AlertService,
    private infoPersonalService: InfoPersonalService,
    private creacioneventosService: CreacioneventosService,
    private selectableService: SelectableService,
    private funcsService: FuncsService,
    private loaderService: LoaderService,
  ) {
    this.selectableUtils = this.selectableService
    this.selectedEvent = new Event(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }

  async ngOnInit() {

    let loader = await this.loaderService.presentLoading('Cargando formulario de eventos 📅')

    const terceros = await this.infoPersonalService
      .getInfoComplementariaTercero(
        environment.TERCEROS_SERVICE,
        `/tercero?fields=Id,UsuarioWSO2&limit=-1`)
      .toPromise();

    this.terceros = terceros

    const dataTipoEventos = await this.infoPersonalService
      .getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/tipo_evento?limit=-1`)
      .toPromise();

    this.tipoeventos = dataTipoEventos

    $('#TipoLugar').val("")

    const ubicacionesTiposLugar = await this.infoPersonalService
      .getInfoComplementariaTercero(environment.API_ENDPOINT_UBICACIONES, `tipo_lugar?limit=-1`)
      .toPromise();

    console.log('ubicacionesTiposLugar', ubicacionesTiposLugar)

    this.ubicacionesTiposLugar = ubicacionesTiposLugar

    console.log('AA🤔', this.eventRow)

    if (this.eventRow && this.eventRow.Id) {

      this.selectedEvent = this.eventRow;

      this.selectedEvent["TipoSesion"] = this.eventRow.TipoEventoId.Id.toString();
      this.selectedEvent["FechaInicio"] = this.eventRow.Inicio.split(' ').join('T')
      this.selectedEvent["FechaFin"] = this.eventRow.Fin.split(' ').join('T')

      let ubicacionStr = await this.infoPersonalService
        .getInfoComplementariaTercero(environment.API_ENDPOINT_UBICACIONES,
          `lugar/?query=Id:${this.eventRow.UbicacionId}&fields=TipoLugarId,Nombre&limit=1`)
        .toPromise();

      console.log('ubicacionStr', ubicacionStr);

      if (!ubicacionStr[0] || !ubicacionStr[0].TipoLugarId) {
        loader.dismiss()
        return this.toastService.presentToast("Error cargando algunos datos ⚙️")
      }

      if (ubicacionStr[0] &&
        ubicacionStr[0].TipoLugarId &&
        ubicacionStr[0].TipoLugarId.Id == 7) {
        this.selectedEvent["TipoLugarDireccion"] = ubicacionStr[0].Nombre
      } else if (ubicacionStr[0].TipoLugarId.Id == 5) {
        this.selectedEvent["TipoLugarMeet"] = ubicacionStr[0].Nombre
      }

      this.selectedEvent.TipoLugar = ubicacionStr[0].TipoLugarId.Id
      this.selectedEvent["TipoLugarStr"] = ubicacionStr[0].TipoLugarId.Nombre
    }

    loader.dismiss()

  }

  setLocationsList(locationType: any) {
    console.log(locationType)
  }

  init_worked_time() {
    this.selectedEvent.FechaInicio = moment().subtract(50, 'minute').format();
  }

  async submitEvent(form: NgForm) {

    try {
      let loader = await this.loaderService.presentLoading('Enviando')

      console.log(form);

      let { Nombre, Descripcion, FechaInicio, FechaFin, TipoSesion } = form.value

      const tipoLugar = this.selectedEvent.TipoLugarStr
      let lugarValue = ''

      if (this.selectedEvent.TipoLugar == 7) {
        lugarValue = this.selectedEvent.TipoLugarDireccion
      }
      else if (this.selectedEvent.TipoLugar == 5) {
        lugarValue = this.selectedEvent.TipoLugarMeet
      }

      console.log(' \n Nombre:' + Nombre, ' \nDescripcion:' + Descripcion, ' \nFechaInicio:' + FechaInicio, ' \nFechaFin:' + FechaFin, ' \nTipo Lugar:' + tipoLugar, ' \nTipoSesion:' + TipoSesion, ' \nPoster:' + this.selectedEvent.Poster, ' \nLugar:' + lugarValue);
// return;
      // let fechaInicioValidation = new Date(FechaInicio).toISOString()
      // fechaInicioValidation = this.funcsService.isoStrToYYYYMMDDHHSSNormal(fechaInicioValidation)
      // console.log('fechaInicioValidation')
      // console.log(fechaInicioValidation)

      if (!Nombre || !tipoLugar || !lugarValue || !Descripcion || !FechaInicio || !FechaFin || !TipoSesion) {
        loader.dismiss()
        return this.toastService.presentToast("Debes diligenciar los campos obligatorios")
      }

      let media;
      if (this.selectedEvent.Poster) {
        media = await this.funcsService
          .imageUpload(this.selectedEvent.Poster, {
            preset_name: 'events',
            cloud_name: 'sise'
          });
      }

      // Event place creation
      let locationValue, ubicacionId;
      if (this.typeEventPlace == 5) {
        locationValue = this.selectedEvent.TipoLugarMeet
      } else if (this.typeEventPlace == 7) {
        locationValue = this.selectedEvent.TipoLugarDireccion
      }

      console.log('locationValue: ', locationValue);

      if (locationValue) {
        const respLocationCreation: any = await this.funcsService
          .postData(environment.API_ENDPOINT_UBICACIONES + '/lugar', {
            "Id": null,
            "Nombre": locationValue,
            "TipoLugarId": {
              "Id": this.typeEventPlace
            },
            "Activo": true
          })
          .toPromise();

        console.log('respLocationCreation: ', respLocationCreation);
        ubicacionId = respLocationCreation.Id;
      }

      let response: any;

      let eventBody = {
        "Id": null,
        "Nombre": Nombre,
        "Descripcion": Descripcion,
        "EventoPadreId": null,
        "FechaInicio": this.funcsService.strToDateTimeWithoutSeconds(FechaInicio.split('T').join(' ')).toISOString(),
        "FechaFin": this.funcsService.strToDateTimeWithoutSeconds(FechaFin.split('T').join(' ')).toISOString(),
        "Activo": true,
        "TipoEventoId": {
          "Id": parseInt(TipoSesion)
        },
        "UbicacionId": ubicacionId ? ubicacionId : 0,
      }

      if (this.selectedEvent.Poster && media)
        eventBody["PosterUrl"] = media[0].url
      else {
        const sesion = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/calendario_evento/${this.eventRow.Id}`).toPromise();
        eventBody["PosterUrl"] = sesion.PosterUrl
      }

      if (this.eventRow && this.eventRow.Id) {
        const sesion = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/calendario_evento/${this.eventRow.Id}`).toPromise();
        eventBody["FechaCreacion"] = sesion.FechaCreacion
        eventBody["FechaModificacion"] = sesion.FechaModificacion
        eventBody["Id"] = this.eventRow.Id

        response = await this.creacioneventosService.editEvent(eventBody, this.eventRow.Id).toPromise();

        this.toastService.presentToast("Evento actualizado correctamente")

      } else {
        response = await this.creacioneventosService.createEvent(eventBody).toPromise();
        this.toastService.presentToast("Evento creado correctamente")
      }

      console.log(response)
      this.dismissModal('modal-new-event')
      loader.dismiss()
    } catch (err) {
      console.error(err)
    }
  }

  dismissModal(modalId: any) {
    this.modalService.dismiss(modalId);
  }

  getPoster(e) {
    console.log(e.target.files);
    console.log(e.target.files[0]);
    this.selectedEvent.Poster = e.target.files;
  }

  async validateEventPlace() {
    this.selectedEvent.TipoLugar = $("#TipoLugarDataList option[value='" + $('#TipoLugar').val() + "']")
      .attr('data-id')

    if (this.selectedEvent.TipoLugar == 7) {
      this.typeEventPlace = 7
    }
    else if (this.selectedEvent.TipoLugar == 5) {
      this.typeEventPlace = 5
    }
  }
}
