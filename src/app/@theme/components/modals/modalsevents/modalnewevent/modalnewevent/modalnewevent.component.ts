import { Component, OnInit, Input, ViewChild } from '@angular/core';
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

    (async () => {
      const terceros = await this.infoPersonalService
        .getInfoComplementariaTercero(
          environment.TERCEROS_SERVICE,
          `/tercero?fields=UsuarioWSO2&limit=-1`)
        .toPromise();

      this.terceros = terceros
    })
  }

  async ngOnInit() {

    let loader = await this.loaderService.presentLoading('Cargando formulario de eventos 📅')

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

    if (this.eventRow && this.eventRow.Id) {

      this.selectedEvent = this.eventRow;
      this.selectedEvent["TipoLugar"] = this.eventRow.TipoEventoId
      this.selectedEvent["TipoSesion"] = this.eventRow.TipoEventoId.Id.toString();
      this.selectedEvent["FechaInicio"] = this.eventRow.Inicio.split(' ').join('T')
      this.selectedEvent["FechaFin"] = this.eventRow.Fin.split(' ').join('T')
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
    let loader = await this.loaderService.presentLoading('Enviando')

    console.log(form);

    let { Nombre, Descripcion, FechaInicio, FechaFin, Lugar, TipoSesion } = form.value

    let fechaInicioValidation = new Date(FechaInicio).toISOString()
    fechaInicioValidation = this.funcsService.isoStrToYYYYMMDDHHSSNormal(fechaInicioValidation)
    console.log('fechaInicioValidation')
    console.log(fechaInicioValidation)

    return;

    if (!Nombre || !Descripcion || !FechaInicio || !FechaFin || !Lugar || !TipoSesion)
      return this.toastService.presentToast("Debes diligenciar los campos obligatorios")

    console.log(' \n Nombre:' + Nombre, ' \nDescripcion:' + Descripcion, ' \nFechaInicio:' + FechaInicio, ' \nFechaFin:' + FechaFin, ' \nLugar:' + Lugar, ' \nTipoSesion:' + TipoSesion, ' \nPoster:' + this.selectedEvent.Poster);

    console.log('this.selectedEvent.', this.selectedEvent);
    console.log('this.typeEventPlace', this.typeEventPlace);

    let media;
    if (this.selectedEvent.Poster) {
      // console.log(this.selectedEvent.Poster)
      media = await this.funcsService.imageUpload(this.selectedEvent.Poster, {
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
      const respLocationCreation: any = await this.funcsService.postData(environment.API_ENDPOINT_UBICACIONES + '/lugar', {
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

    // .subscribe((res: any) => {
    //   console.log('Res creacion tercero', res);
    // })

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
