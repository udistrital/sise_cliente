import { Component, OnInit, Renderer2  } from '@angular/core';
import { ModalneweventComponent } from '../../@theme/components/modals/modalsevents/modalnewevent/modalnewevent/modalnewevent.component';
import { ModalService } from '../../@core/services/notify/modal.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../../@core/services/notify/toast.service';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { Documento } from '../../@core/data/models/document';

@Component({
  selector: 'app-creacioneventos',
  templateUrl: './creacioneventos.component.html',
  styleUrls: ['./creacioneventos.component.scss'],
})

export class CreacioneventosComponent implements OnInit {

  public rows: any;
  public col: any;
  public arrRoleUserSession: any;
  public isAdminSiseFlag: any;
  eventos: any
  private autenticacion = new ImplicitAutenticationService;

  constructor(
    private renderer: Renderer2,
    private loaderService: LoaderService,
    public modalCtrl: ModalController,
    public modalService: ModalService,
    private readonly infoPersonalService: InfoPersonalService
  ) {

    this.col = [
      { name: 'Id' },
      { name: 'Descripcion' },
      { name: 'Inicio' },
      { name: 'Fin' },
      { name: 'Lugar' },
    ];
  }

  async ngOnInit() {
    let loader = await this.loaderService.presentLoading('Cargando eventos')

    console.log(document.getElementById('background-content'))

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    this.arrRoleUserSession = rest["role"]

    console.log(this.arrRoleUserSession)

    this.arrRoleUserSession.forEach(role => {
      if(role == 'ADMIN_SISE'){
        this.isAdminSiseFlag = true
      }
    })

    console.log(this.isAdminSiseFlag)
    await this.setEvents();
    loader.dismiss()
  }

  async setEvents() {
    // const dataTipoEventos = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/tipo_sesion?limit=-1`).toPromise();
    // this.tipoeventos = dataTipoEventos

    const dataEventos = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/sesion?limit=-1`).toPromise();
    this.eventos = dataEventos
    this.eventos.forEach((evento, index) => {

      this.eventos[index]['inicio'] = new Date(evento.FechaInicio).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)

      delete this.eventos[index]['FechaInicio']

      this.eventos[index]['fin'] = new Date(evento.FechaFin).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)

      this.eventos[index]['tipo'] = evento.TipoSesion
      this.eventos[index]['descripcion'] = evento.Descripcion
      this.eventos[index]['lugar'] = evento.Lugar
      this.eventos[index]['id'] = evento.Id

      delete this.eventos[index]['FechaFin']
      delete this.eventos[index]['Recurrente']
      delete this.eventos[index]['Periodo']
      delete this.eventos[index]['NumeroRecurrencias']
      delete this.eventos[index]['FechaModificacion']
      delete this.eventos[index]['TipoSesion']
      delete this.eventos[index]['FechaCreacion']
    })
    // FechaInicio
    // FechaFin
    this.rows = this.eventos
    console.log(dataEventos)
  }

  async openEventModal(eventRow: any = null) {

    console.log('eventRow', eventRow)

    const modal = await this.modalCtrl.create({
      component: ModalneweventComponent,
      keyboardClose: false,
      backdropDismiss: false,
      animated: true,
      id: 'modal-new-event',
      componentProps: { eventRow },
      cssClass: 'fullscreen'
    });

    modal.onDidDismiss().then(async (data) => {
      console.log(data)
      await this.setEvents();
    });

    return await modal.present();

  }

  async inactivateEvent(row:any){

  }

}
