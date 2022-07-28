import { Component, OnInit } from '@angular/core';
import { ImplicitAutenticationService } from '../../../../@core/utils/implicit_autentication.service';
import { environment } from '../../../../../environments/environment';
import { InfoPersonalService } from '../../../../@core/services/infopersonal.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalbirthday',
  templateUrl: './modalbirthday.component.html',
  styleUrls: ['./modalbirthday.component.scss'],
})
export class ModalbirthdayComponent implements OnInit {

  terceroPersonalData: any

    constructor(
      private readonly infoPersonalService: InfoPersonalService, 
      private modalCtrl: ModalController,
    private autenticacion: ImplicitAutenticationService,

      ) { }

  async ngOnInit() {
    const { email, documento } = this.autenticacion.getPayload()
    let data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise();

    console.log('YEAH', data[0])
     this.terceroPersonalData = data[0]
    this.terceroPersonalData.TerceroId.FechaNacimiento = new Date(this.terceroPersonalData.TerceroId.FechaNacimiento).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
  }

  dismiss(){
    this.modalCtrl.dismiss(undefined, undefined, 'modal-birthday');
  }

}
