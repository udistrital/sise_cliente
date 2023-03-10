import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SendEmailService } from '../../@core/services/sendemail/sendemail.service';
import { environment } from '../../../environments/environment';
import { DatosIdentificacionTercero } from '../../@core/data/models/datos_identificacion_tercero';
import { Documento } from '../../@core/data/models/document';
import { FuncsService } from '../../@core/services/funcs.service';
import { HomeService } from '../../@core/services/home.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { ModalService } from '../../@core/services/notify/modal.service';
import { ToastService } from '../../@core/services/notify/toast.service';
import { PhotoService } from '../../@core/services/photo.service';
import { TerceroService } from '../../@core/services/tercero/tercero.service';
import { formatSSSZDate, getMaxDate } from '../../@core/utils/formatAPIDate';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { ModalbirthdayComponent } from '../../@theme/components/modals/modalbirthday/modalbirthday.component';
import { single } from './data';
import { CreacioneventosService } from 'src/app/@core/services/creacioneventos.service';

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

  // charts
  single: any[];
  view: [number, number] = [800, 600];
  viewGridChart: [number, number] = [500, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  sendEmail: any
  eventsService: any

  // GRID CHART
  designatedTotal = 8940000;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

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
    private sendEmailService: SendEmailService,
    private creacioneventosService: CreacioneventosService,
  ) {
    this.autenticacion.user$.subscribe((data: any) => {
      const { user, userService } = data;
      console.log({ user, userService });
      this.username = typeof user.email !== 'undefined' ? user.email : typeof userService.email !== 'undefined' ? userService.email : '';
      this.liveTokenValue = this.username !== '';
    })

    this.sendEmail = this.sendEmailService
    this.eventsService = this.creacioneventosService
    // charts
    Object.assign(this, { single });
  }

  logout() {

    const confirm = window.confirm('¿Estás seguro de cerrar sesión?');
    if (confirm) {
      this.autenticacion.logout('from header');
    }
  }

  async ngOnInit() {

    let loader = await this.loaderService.presentLoading('Cargando página principal')

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto } = await this
      .infoPersonalService
      .getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body)
      .toPromise() as Documento;
    if (!documento) {
      console.log("Something went wrong, when try to get the identification");
      return
    }

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()
    this.terceroPersonalData = data[0]

    if (!this.terceroPersonalData) return
    this.terceroId = data[0].TerceroId.Id

    const hoy = new Date()
    const fechaActual = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    let fechaFormateada = fechaActual.slice(0, 4)

    const diaNacimiento = this.terceroPersonalData.TerceroId.hasOwnProperty('FechaNacimiento') ? new Date(this.terceroPersonalData.TerceroId?.FechaNacimiento) : null

    if (diaNacimiento) {
      const nacimiento = diaNacimiento.getDate() + '-' + (diaNacimiento.getMonth() + 1) + '-' + diaNacimiento.getFullYear();
      let fechaCumpleaños = nacimiento.slice(0, 4)

      if (fechaFormateada && fechaCumpleaños && (fechaFormateada == fechaCumpleaños)) {
        console.log("-😅🧩🧩", email)
        const emailConfig = {
          Emails: [email],
          Asunto: "Feliz cumpleaños egresado UD 🎂",
          Mensaje: "¡Feliz cumpleaños egresado de la Universidad Distrital Francisco José de Caldas! Hoy celebramos no solo tu cumpleaños, sino también tus logros y tu dedicación para llegar hasta aquí. Como egresado de una de las mejores universidades de Colombia, eres una inspiración para muchos y un verdadero ejemplo de perseverancia y éxito. Que este nuevo año de vida te traiga muchas más alegrías y bendiciones, y que sigas siendo un orgullo para tu alma máter. ¡Feliz cumpleaños y muchos éxitos más! 🎂"
        }

        await this.sendEmail.sendEmailFull(emailConfig)
        console.log("💪💪💪💪")

        this.modalService.openModal(ModalbirthdayComponent, 'modal-birthday');
      }
    }

    this.terceroPersonalData.TerceroId.FechaNacimiento = this.terceroPersonalData.TerceroId?.FechaNacimiento
      ? new Date(this.terceroPersonalData.TerceroId.FechaNacimiento).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
      : null

    const variablesTercero = await this.terceroService.getVariablesTercero(this.terceroId).toPromise()
    const arrFechaModificaciones = variablesTercero.map(item => formatSSSZDate(item.FechaModificacion))
    console.log(arrFechaModificaciones)
    console.log('Fecha Modificación ✅')
    console.log(formatSSSZDate(this.terceroPersonalData.TerceroId.FechaModificacion))
    this.terceroPersonalData.TerceroId.FechaModificacion = getMaxDate(arrFechaModificaciones)

    const dataEventos = await this.infoPersonalService
      .getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/calendario_evento?query=Activo:true&limit=-1`)
      .toPromise();

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

    this.eventos = this.eventos.sort((a, b) => -1)
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

  // Chart
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  async enrollMeToEvent(eventId) {
    let loader = await this.loaderService.presentLoading(`Inscribiendome al evento...`)
    try {
      console.log(eventId)
      const event = await this.eventsService
        .getEventById(eventId)
        .toPromise();
      const { email } = this.autenticacion.getPayload()

      console.log(event)
      const eventToEnroll = event[0]

      const dateStartEvent = new Date(eventToEnroll.FechaInicio).toISOString()
      console.log(dateStartEvent)
      let fechaInicioEventEmail = this.funcsService.isoStrToYYYYMMDDHHSSNormal(dateStartEvent)

      const dateEndEvent = new Date(eventToEnroll.FechaFin).toISOString()
      let fechaFinEventEmail = this.funcsService.isoStrToYYYYMMDDHHSSNormal(dateEndEvent)

      let eventLocation
      if (eventToEnroll.UbicacionId) {
        let ubicacion = await this.infoPersonalService
          .getInfoComplementariaTercero(environment.API_ENDPOINT_UBICACIONES,
            `lugar/?query=Id:${eventToEnroll.UbicacionId}&fields=Nombre&limit=1`)
          .toPromise();

        console.log(ubicacion[0].Nombre);

        eventLocation = ubicacion[0].Nombre
      }

      const emailConfig = {
        Emails: [email],
        Asunto: `Inscripción al evento de ${eventToEnroll.Nombre} exitosa`,
        Mensaje: `${email} se inscribió al evento de ${eventToEnroll.Nombre} exitosamente de:\n ${eventToEnroll.Descripcion}\nUbicación: ${eventLocation || "Por definir"}\nInicia: ${fechaInicioEventEmail} y termina: ${fechaFinEventEmail}`
      }
      await this.sendEmail.sendEmailFull(emailConfig)
      loader.dismiss()
      this.toastService.presentToast("Inscripción exitosa, te llegará un correo de confirmación")

    } catch (error) {
      console.error(error)
      this.toastService.presentToast("Hubo un error, por favor intenta de nuevo más tarde")
      loader.dismiss()
    }
  }
}
