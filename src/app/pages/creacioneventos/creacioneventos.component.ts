import { Component, OnInit } from '@angular/core';
import { ModalneweventComponent } from '../../@theme/components/modals/modalsevents/modalnewevent/modalnewevent/modalnewevent.component';
import { ModalService } from '../../@core/services/modal.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-creacioneventos',
  templateUrl: './creacioneventos.component.html',
  styleUrls: ['./creacioneventos.component.scss'],
})

export class CreacioneventosComponent implements OnInit {

  public rows: any;
  public col: any;
  eventos: any
  // tipoeventos: any

  constructor(public modalCtrl: ModalController, public modalService: ModalService, private readonly infoPersonalService: InfoPersonalService) {

    this.col = [
      { name: 'Id' },
      { name: 'Descripcion' },
      { name: 'Inicio' },
      { name: 'Fin' },
      { name: 'Lugar' },
    ];
  }

  async ngOnInit() {
    await this.setEvents();
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
    // console.log('rowId')
    // console.log(rowId)
    const modal = await this.modalCtrl.create({
      component: ModalneweventComponent,
      keyboardClose: false,
      backdropDismiss: false,
      animated: true,
      id: 'modal-new-event',
      componentProps: { eventRow },
      cssClass: 'fullscreen'
    });

    // modal.onDidDismiss(() => {
    //   // This will be executed after the modal is dismissed...
    //   console.log('Hi...');
    // });

    modal.onDidDismiss().then(async (data) => {
      console.log(data)
      await this.setEvents();
    });

    return await modal.present();
    // this.modalService.openModal(ModalneweventComponent, 'modal-new-event', rowId);
  }

}
