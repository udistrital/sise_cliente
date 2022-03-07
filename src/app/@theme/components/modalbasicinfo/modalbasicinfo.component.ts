import { Component, OnInit } from '@angular/core';
// import { HomePage } from '../../../pages/home/home.page';
// import { HomeService } from '../../../@core/services/home.service';
import { Tercero } from '../../../@core/data/models/tercero';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InfoPersonalService } from '../../../@core/services/infopersonal.service';
import { environment } from 'src/environments/environment.dev';
import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';

@Component({
  selector: 'app-modalbasicinfo',
  templateUrl: './modalbasicinfo.component.html',
  styleUrls: ['./modalbasicinfo.component.scss'],
  // providers: [HomePage]
})

export class ModalbasicinfoComponent implements OnInit {

  selectedBasicUserData: Tercero
  private autenticacion = new ImplicitAutenticationService;

  constructor(
    private readonly infoPersonalService: InfoPersonalService,
    // public homeService: HomeService,
    private modalCtrl: ModalController,
    // public homePage: HomePage,
  ) {
    this.selectedBasicUserData = new Tercero(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }

  ngOnInit() { }

  public createTercero(form: NgForm) {
    // const { email } = this.autenticacion.getPayload()
    let email = 'egresados@udistrital.edu.co'
    console.log(this.modalCtrl);
    // console.log(form)
    // alert(form)

    let { PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, TipoContribuyenteId } = form.value
    let NombreCompleto = ((PrimerNombre ? PrimerNombre + ' ' : '') + (SegundoNombre ? SegundoNombre + ' ' : '') + (PrimerApellido ? PrimerApellido + ' ' : '') + (SegundoApellido ? SegundoApellido : '')).trim()

    console.log('NombreCompleto', NombreCompleto);
    // return;

    console.log(PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, TipoContribuyenteId)

    this.infoPersonalService.createTercero(environment.CREATE_TERCERO_ENDPOINT, {
      "Id": null,
      "Activo": true,
      "LugarOrigen": 0,
      "NombreCompleto": NombreCompleto,
      "PrimerApellido": PrimerApellido,
      "PrimerNombre": PrimerNombre,
      "SegundoApellido": SegundoApellido,
      "SegundoNombre": SegundoNombre,
      "TipoContribuyenteId": {
        "Id": parseInt(TipoContribuyenteId)
      },
      "UsuarioWSO2": email
    }).subscribe(res => {
      console.log(res);
    })

    this.modalCtrl.dismiss(undefined, undefined, 'modalCreateTercero');

    // this.homePage.modalCtrl.dismiss({
    //   'dismissed': true
    // });
    // this.modalCtrl.dismiss({
    //   'dismissed': true
    // });
  }
}
