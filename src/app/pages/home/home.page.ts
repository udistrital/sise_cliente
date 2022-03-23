import { Component, OnInit } from '@angular/core';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { PhotoService } from '../../@core/services/photo.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment.dev';
import { ModalController } from '@ionic/angular';
import { ModalbasicinfoComponent } from '../../@theme/components/modals/modalbasicinfo/modalbasicinfo.component';
import { HomeService } from '../../@core/services/home.service';
import { DatosIdentificacionTercero } from '../../@core/data/models/datos_identificacion_tercero';
import { ModalbirthdayComponent } from '../../@theme/components/modals/modalbirthday/modalbirthday.component';
import { ModalService } from '../../@core/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [HomeService, InfoPersonalService, PhotoService, ModalService]
})

export class HomePage implements OnInit {

  private autenticacion = new ImplicitAutenticationService;
  sessionUser: any
  terceroPersonalData: any
  dataInfo: DatosIdentificacionTercero = new DatosIdentificacionTercero();

  constructor(
    public homeService: HomeService,
    public modalService: ModalService,
    public photoService: PhotoService,
    private readonly infoPersonalService: InfoPersonalService
  ) {}

  async ngOnInit() {

    console.log('HERE')
    console.log(this.autenticacion.getPayload())
    const { email, documento } = this.autenticacion.getPayload()

    let data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise();

    console.log(data[0]);
    this.modalService.openModal(ModalbirthdayComponent, 'modal-birthday');

    this.terceroPersonalData = data[0]
    // this.terceroPersonalData.TerceroId.FechaNacimiento = new Date(this.terceroPersonalData.TerceroId.FechaNacimiento).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
    this.terceroPersonalData.FechaModificacion = new Date(this.terceroPersonalData.FechaModificacion).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
  }

  logout() {
    this.autenticacion.logout();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
