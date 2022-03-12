import { Component, OnInit } from '@angular/core';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { PhotoService } from '../../@core/services/photo.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment.dev';
import { ModalController } from '@ionic/angular';
import { ModalbasicinfoComponent } from '../../@theme/components/modalbasicinfo/modalbasicinfo.component';
import { HomeService } from '../../@core/services/home.service';
import { DatosIdentificacionTercero } from 'src/app/@core/data/models/datos_identificacion_tercero';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [HomeService, InfoPersonalService, PhotoService]
})

export class HomePage implements OnInit {

  private autenticacion = new ImplicitAutenticationService;
  sessionUser: any
  terceroPersonalData: any
  dataInfo: DatosIdentificacionTercero = new DatosIdentificacionTercero();

  constructor(
    public homeService: HomeService,
    public modalCtrl: ModalController,
    public photoService: PhotoService,
    private readonly infoPersonalService: InfoPersonalService
  ) {

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalbasicinfoComponent,
      keyboardClose: false,
      backdropDismiss: false,
      id: 'modalCreateTercero'
    });

    return await modal.present();
  }

  public dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async ngOnInit() {

    console.log('HERE')
    console.log(this.autenticacion.getPayload())
    const { email, documento } = this.autenticacion.getPayload()

    let data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise();

    console.log(data[0]);
    
    this.terceroPersonalData = data[0]
    this.terceroPersonalData.FechaModificacion = new Date(this.terceroPersonalData.FechaModificacion).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
    // .subscribe((result: any) => {
    //   console.log('resultado obtencion DATA TERCERO', result);
    //   this.dataInfo = result
    // })
  }

  logout() {
    this.autenticacion.logout();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
