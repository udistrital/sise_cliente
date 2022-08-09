import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalneweventComponent } from '../../@theme/components/modals/modalsevents/modalnewevent/modalnewevent/modalnewevent.component';
import { ModalService } from '../../@core/services/notify/modal.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../../@core/services/notify/toast.service';
import { AlertService } from '../../@core/services/notify/alert.service';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { Documento } from '../../@core/data/models/document';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { CreacioneventosService } from '../../@core/services/creacioneventos.service';
import { FuncsService } from '../../@core/services/funcs.service';
import { SimpleComponent } from '../../@theme/components/enlargeImg/simple/simple/simple.component';
// import { SimpleComponent } from '../../@theme/components/enlargeImg/simple/simple/simple.component';

@Component({
  selector: 'app-creacioneventos',
  templateUrl: './creacioneventos.component.html',
  styleUrls: ['./creacioneventos.component.scss'],
})

export class CreacioneventosComponent implements OnInit {
  // @ViewChild('search', { static: false }) search: any;
  public rows: any;
  public cols: any;
  public arrRoleUserSession: any;
  public isAdminSiseFlag: any;
  eventos: any
  name = 'Ngx Datatables Filter All Columns';
  public temp: Array<object> = [];
  settings: any
  confirm: any

  constructor(
    private renderer: Renderer2,
    private loaderService: LoaderService,
    public modalCtrl: ModalController,
    public modalService: ModalService,
    private autenticacion: ImplicitAutenticationService,
    private readonly infoPersonalService: InfoPersonalService,
    public alertService: AlertService,
    private creacioneventosService: CreacioneventosService,
    public toastService: ToastService,
    private funcsService: FuncsService
  ) {

    this.cols = [
      { prop: 'id', name: 'Id' },
      { prop: 'descripcion', name: 'Descripcion' },
      { prop: 'inicio', name: 'Inicio' },
      { prop: 'fin', name: 'Fin' },
      { prop: 'ubicacion', name: 'Lugar' },
      { prop: 'test', name: 'test' },
    ]

  }

  async ngOnInit() {
    let loader = await this.loaderService.presentLoading('Cargando eventos')

    console.log(document.getElementById('background-content'))

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    this.arrRoleUserSession = rest["role"]

    console.log(this.arrRoleUserSession)

    this.arrRoleUserSession.forEach((role: any) => {
      if (role == 'ADMIN_SISE') {
        this.isAdminSiseFlag = true
      }
    })

    this.settings = {
      add: {
        addButtonContent: '',
        createButtonContent: '',
        cancelButtonContent: 'Cancelar',
        confirmCreate: true,
      },
      // hideSubHeader: true,
      // actions: false,
      // delete: {
      //   confirmDelete: true,

      //   deleteButtonContent: 'Delete data',
      //   saveButtonContent: 'save',
      //   cancelButtonContent: 'cancel'
      // },
      // add: {
      //   confirmCreate: true,
      // },
      // edit: {
      //   confirmSave: true,
      // },
      columns: {
        Id: {
          title: 'Id',
          editable: false,
          addable: false,
          sortDirection: 'desc'
        },
        Nombre: {
          title: 'Nombre',
          editable: false,
          addable: false,
        },
        Descripcion: {
          title: 'Descripcion',
          editable: false,
          addable: false,
        },
        Inicio: {
          title: 'Inicio',
          editable: false,
          addable: false,
        },
        Fin: {
          title: 'Fin',
          editable: false,
          addable: false,
        },
        TipoEventoId: {
          title: 'Tipo',
          editable: false,
          addable: false,
          valuePrepareFunction: (data) => {
            return data.Nombre;
          },
        },
        Lugar: {
          title: 'Lugar',
          editable: false,
          addable: false,
          // valuePrepareFunction: (data) => {
          //   console.log(data);
          //   return data;
          // },
        },
        PosterUrl: {
          title: 'Poster',
          editable: false,
          addable: false,
          // type: 'html',
          type: 'custom',
          valuePrepareFunction: (picture) => {
            return picture
          },
          renderComponent: SimpleComponent
          //   // return `<img width="50px" class="posterImg" style="display:flex; justify-content: center; text-align-center;" src="${picture}" />`;

          //   return `<app-simple></app-simple>`;
          // },
          // <app-simple></app-simple>
          // renderComponent: <SimpleComponent />
          // renderComponent: <app-simple></app-simple>
        },
        // Fin: {
        //   title: 'Fin'
        // }
      },
      actions: {
        custom: [
          // {
          //   name: 'yourAction',
          //   title: '<i class="ion-document" title="YourAction"></i>'
          // },
          {
            name: 'editAction',
            title: this.isAdminSiseFlag ? '<i style="background-color: yellow; margin-right: 2rem;" class="fas fa-edit"></i>' : '',
          },
          {
            name: 'deleteAction',
            title: this.isAdminSiseFlag ? '<i style="background-color: yellow;" class="fas fa-trash"></i>' : '',
          },
          // {
          //   name: 'deleteAction',
          //   title: '<i class="far fa-trash-alt" title="delete"></i>'
          // }
        ],
        add: false,
        edit: false,
        delete: false
      }
    };

    console.log(this.isAdminSiseFlag)
    await this.setEvents();
    loader.dismiss()
  }

  async setEvents() {

    const dataEventos = await this.infoPersonalService.getInfoComplementariaTercero(environment.EVENTOS_ENDPOINT, `/calendario_evento?query=Activo:true&limit=-1`).toPromise();

    this.eventos = dataEventos

    this.eventos.forEach((evento, index) => {

      let fechaInicio = new Date(evento.FechaInicio).toISOString()
      this.eventos[index]['Inicio'] = this.funcsService.isoStrToYYYYMMDDHHSSNormal(fechaInicio)

      let fechaFin = new Date(evento.FechaFin).toISOString()
      this.eventos[index]['Fin'] = this.funcsService.isoStrToYYYYMMDDHHSSNormal(fechaFin)

      this.eventos[index]['PosterUrl'] = evento.PosterUrl
      this.eventos[index]['tipo'] = evento.TipoSesion
      this.eventos[index]['descripcion'] = evento.Descripcion
      this.eventos[index]['id'] = evento.Id
      // this.eventos[index]['ubicacionId'] = evento.UbicacionId
      // this.eventos[index]['UbicacionId'] = evento.UbicacionId
      // this.eventos[index]['Lugar'] = evento.UbicacionId
    })

    await Promise.all(this.eventos.map(async (evento, index) => {
      if (evento.UbicacionId) {
        let ubicacion = await this.infoPersonalService
          .getInfoComplementariaTercero(environment.API_ENDPOINT_UBICACIONES, `lugar/?query=Id:${evento.UbicacionId}&fields=Nombre&limit=1`)
          .toPromise();

        console.log(ubicacion[0].Nombre);

        this.eventos[index]['Lugar'] = ubicacion[0].Nombre
      }
      // this.eventos[index]['place'] = ubicacion[0].Nombre
    }));

    this.rows = this.eventos
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

  async inactivateEvent(row: any) {

    // this.alertService.presentConfirm(`¿Estás seguro de que deseas cancelar el evento ${row.Nombre}?`).then((res) => {
    //   console.log(res)
    // })
    // // console.log(test)}
    // return;

    let eventBody = {
      "Id": row.Id,
      "Descripcion": row.Descripcion,
      "Nombre": row.Nombre,
      "FechaCreacion": "2021-11-30 12:24:14.005133 +0000 +0000",
      "FechaModificacion": "2021-12-02 19:36:51.252391 +0000 +0000",
      "FechaInicio": "2000-01-01T05:00:00Z",
      "FechaFin": "2000-01-01T05:00:00Z",
      "Activo": false,
      "TipoEventoId": {
        "Id": 5
      }
    }

    let res = await this.creacioneventosService.editEvent(eventBody, row.Id).toPromise();

    console.log(res);

    this.toastService.presentToast("Evento cancelado con exito")

    await this.setEvents();
  }

  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event);
  }

  onCustomAction(event) {
    console.log(event);
    switch (event.action) {
      case 'editAction':
        this.openEventModal(event.data)
        break;
      case 'deleteAction':
        this.inactivateEvent(event.data)
        break;

    }
  }

}
