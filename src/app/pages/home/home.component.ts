import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { PhotoService } from '../../@core/services/photo.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment';
import { HomeService } from '../../@core/services/home.service';
import { DatosIdentificacionTercero } from '../../@core/data/models/datos_identificacion_tercero';
import { ModalbirthdayComponent } from '../../@theme/components/modals/modalbirthday/modalbirthday.component';
import { ModalService } from '../../@core/services/notify/modal.service';
import { Documento } from '../../@core/data/models/document';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { Router } from '@angular/router';
import { FuncsService } from '../../@core/services/funcs.service';
import { TerceroService } from '../../@core/services/tercero/tercero.service';
import { ToastService } from '../../@core/services/notify/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [HomeService, InfoPersonalService, PhotoService, ModalService]
})

export class HomeComponent implements OnInit {

  @ViewChild('fileInput') myFileInput: ElementRef;
  sessionUser: any
  terceroPersonalData: any
  eventos: any
  dataInfo: DatosIdentificacionTercero = new DatosIdentificacionTercero();
  liveTokenValue: boolean = false;
  username = '';
  terceroId: any
  profilePicture: any = '../assets/avatar.png'

  constructor(
    public homeService: HomeService,
    private readonly terceroService: TerceroService,
    public modalService: ModalService,
    public toastService: ToastService,
    public photoService: PhotoService,
    private autenticacion: ImplicitAutenticationService,
    private loaderService: LoaderService,
    private readonly infoPersonalService: InfoPersonalService,
    private funcsService: FuncsService,
    private router: Router,
  ) {
    this.autenticacion.user$.subscribe((data: any) => {
      const { user, userService } = data;
      console.log({ user, userService });
      this.username = typeof user.email !== 'undefined' ? user.email : typeof userService.email !== 'undefined' ? userService.email : '';
      this.liveTokenValue = this.username !== '';
    })
  }

  logout() {
    this.autenticacion.logout('from header');
  }

  async ngOnInit() {

    let loader = await this.loaderService.presentLoading('Cargando página principal')

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    console.log(documento, documento_compuesto)
    if (!documento) {
      console.log("Something went wrong, when try to get the identification");
      return
    }

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()
    this.terceroPersonalData = data[0]
    console.log(data);
    this.terceroId = data[0].TerceroId.Id

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

    await Promise.all(this.eventos.map(async (evento, index) => {
      if (evento.UbicacionId) {
        let ubicacion = await this.infoPersonalService
          .getInfoComplementariaTercero(environment.API_ENDPOINT_UBICACIONES, `lugar/?query=Id:${evento.UbicacionId}&fields=Nombre&limit=1`)
          .toPromise();

        console.log(ubicacion[0].Nombre);

        this.eventos[index]['Lugar'] = ubicacion[0].Nombre
      }
    }));

    await this.getProfilePicture();
    loader.dismiss()
  }

  async setProfilePicture(e: File[]) {
    let loader = await this.loaderService.presentLoading('Guardando foto de perfil')

    console.log(e)
    console.log(e[0])
    let media = await this.funcsService.imageUpload([e[0]], {
      preset_name: 'events',
      cloud_name: 'sise'
    });

    if (!media) return 'Error Imagen'

    let ictBody = {
      "Activo": true,
      "Dato": "{\"Data\": \"" + media[0].url + "\"}",
      "Id": null,
      "InfoCompleTerceroPadreId": null,
      "InfoComplementariaId": {
        "Id": environment.INFO_COMPLEMENTARIA_IDS.FOTO_DE_PERFIL_SISE
      },
      "TerceroId": {
        "Id": this.terceroId
      }
    }

    let data = await this.infoPersonalService
      .getInfoComplementariaTercero(
        environment.TERCEROS_SERVICE,
        `/info_complementaria_tercero/?query=TerceroId.Id:${this.terceroId}` + `,InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.FOTO_DE_PERFIL_SISE}`)
      .toPromise();

    if (data && data.length > 0 && data[0] && Object.keys(data[0]).length > 0) {
      // put
      await this.infoPersonalService
        .updateInformation(environment.TERCEROS_SERVICE + `/info_complementaria_tercero/${data[0].Id}`, ictBody)
        .toPromise();

    } else {
      // post
      await this.terceroService
        .saveDataTercero(`/info_complementaria_tercero`, ictBody).toPromise();
    }

    await this.getProfilePicture()
    loader.dismiss()
    this.toastService.presentToast("Foto de perfil cargada")
  }

  async getProfilePicture() {
    let data = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=TerceroId.Id:${this.terceroId}` + `,InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.FOTO_DE_PERFIL_SISE}`).toPromise();

    if (data && data.length > 0 && data[0].Dato && typeof data[0].Dato == 'string' && JSON.parse(data[0].Dato).Data && JSON.parse(data[0].Dato).Data != "\"") {
      this.profilePicture = JSON.parse(data[0].Dato).Data
    }

    setTimeout(() => {
      console.log('PICTURE:')
      console.log(this.profilePicture);

    }, 2000);
  }

  executeClickFileInput() {
    let element: HTMLElement = document.getElementById('profilePictureInput') as HTMLElement;
    element.click();
  }
}
