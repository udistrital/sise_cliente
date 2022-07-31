import { Component, OnInit } from '@angular/core';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { PhotoService } from '../../@core/services/photo.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ModalbasicinfoComponent } from '../../@theme/components/modals/modalbasicinfo/modalbasicinfo.component';
import { HomeService } from '../../@core/services/home.service';
import { DatosIdentificacionTercero } from '../../@core/data/models/datos_identificacion_tercero';
import { ModalbirthdayComponent } from '../../@theme/components/modals/modalbirthday/modalbirthday.component';
import { ModalService } from '../../@core/services/notify/modal.service';
import { Documento } from '../../@core/data/models/document';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [HomeService, InfoPersonalService, PhotoService, ModalService]
})

export class HomeComponent implements OnInit {

  private autenticacion = new ImplicitAutenticationService;
  sessionUser: any
  terceroPersonalData: any
  eventos: any
  dataInfo: DatosIdentificacionTercero = new DatosIdentificacionTercero();
  liveTokenValue: boolean = false;
  username = '';

  constructor(
    public homeService: HomeService,
    public modalService: ModalService,
    public photoService: PhotoService,
    private loaderService: LoaderService,
    private readonly infoPersonalService: InfoPersonalService,
    private router: Router
  ) {
    this.liveToken();
  }

  liveToken() {
    if (this.autenticacion.live()) {
      this.liveTokenValue = this.autenticacion.live();
      this.username = (this.autenticacion.getPayload()).sub;
    }
    return this.autenticacion.live();
  }

  logout() {
    this.autenticacion.logout();
  }

  async ngOnInit() {

    let loader = await this.loaderService.presentLoading('Cargando página principal')

    console.log(this.autenticacion.getPayload())
    const userDataTest = this.autenticacion.getPayload()
    console.log(userDataTest);

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    console.log(documento, documento_compuesto)
    if (!documento) {
      console.log("Something went wrong, when try to get the identification");
      return
    }

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()
    this.terceroPersonalData = data[0]
    console.log(data);

    setTimeout(() => {
      console.log(documento);
      console.log(data);
    }, 2000);

    const hoy = new Date()
    const fechaActual = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    let fechaFormateada = fechaActual.slice(0, 4)

    const diaNacimiento = new Date(this.terceroPersonalData.TerceroId?.FechaNacimiento)
    const nacimiento = diaNacimiento.getDate() + '-' + (diaNacimiento.getMonth() + 1) + '-' + diaNacimiento.getFullYear();
    let fechaCumpleaños = nacimiento.slice(0, 4)

    if (fechaFormateada && fechaCumpleaños && (fechaFormateada == fechaCumpleaños)) {
      this.modalService.openModal(ModalbirthdayComponent, 'modal-birthday');
    }

    this.terceroPersonalData.TerceroId.FechaNacimiento = this.terceroPersonalData.TerceroId?.FechaNacimiento
      ? new Date(this.terceroPersonalData.TerceroId.FechaNacimiento).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
      : null
    this.terceroPersonalData.FechaModificacion = new Date(this.terceroPersonalData.FechaModificacion).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)

    const dataEventos = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/calendario_evento?query=Activo:true&limit=-1`).toPromise();
    this.eventos = dataEventos
    this.eventos.forEach((evento, index) => {
      this.eventos[index].FechaInicio = new Date(evento.FechaInicio).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
      this.eventos[index].FechaFin = new Date(evento.FechaFin).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
    })
    console.log(dataEventos)

    loader.dismiss()
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
