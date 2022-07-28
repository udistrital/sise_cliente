import { Component, OnInit } from '@angular/core';
// import { HomePage } from '../../../pages/home/home.page';
// import { HomeService } from '../../../@core/services/home.service';
import { Tercero } from '../../../../@core/data/models/tercero';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InfoPersonalService } from '../../../../@core/services/infopersonal.service';
import { environment } from 'src/environments/environment.dev';
import { ImplicitAutenticationService } from '../../../../@core/utils/implicit_autentication.service';

@Component({
  selector: 'app-modalbasicinfo',
  templateUrl: './modalbasicinfo.component.html',
  styleUrls: ['./modalbasicinfo.component.scss'],
  // providers: [HomePage]
})

export class ModalbasicinfoComponent implements OnInit {

  selectedBasicUserData: Tercero
  public documentTypes: any

  constructor(
    private autenticacion: ImplicitAutenticationService,

    private readonly infoPersonalService: InfoPersonalService,
    // public homeService: HomeService,
    private modalCtrl: ModalController,
    // public homePage: HomePage,
  ) {
    this.selectedBasicUserData = new Tercero(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }

  ngOnInit() {
    this.infoPersonalService.getDocumentTypes(environment.GET_DOCUMENT_TYPES_ENDPOINT).subscribe(res => {
      console.log('TIPOS DE DOCUMENTO', res);
      this.documentTypes = res
    })
  }

  public createTercero(form: NgForm) {
    const { email } = this.autenticacion.getPayload()
    // let email = 'egresados@udistrital.edu.co'
    console.log(this.modalCtrl);


    let { PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, TipoContribuyenteId, Numero, FechaExpedicion, TipoDocumentoId } = form.value

    if (!TipoContribuyenteId) alert('Llena todos los campos obligatorios')

    let NombreCompleto = ((PrimerNombre ? PrimerNombre + ' ' : '') + (SegundoNombre ? SegundoNombre + ' ' : '') + (PrimerApellido ? PrimerApellido + ' ' : '') + (SegundoApellido ? SegundoApellido : '')).trim()

    console.log(Numero, FechaExpedicion, TipoDocumentoId)

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
    }).subscribe((res: any) => {
      console.log('Res creacion tercero', res);

      alert(res.Id)
      if (!res.Id) return alert("Hubo un error, contacte con tecnología")

      this.infoPersonalService.createTercero(environment.CREATE_DATA_IDENTIFICATION_TERCERO_ENDPOINT, {
        "Id": null,
        "Activo": true,
        "CiudadExpedicion": 0,
        "DigitoVerificacion": 0,
        "DocumentoSoporte": 0,
        "FechaExpedicion": new Date(FechaExpedicion.toString().trim()),
        "Numero": Numero.toString(),
        "TerceroId": {
          "Id": parseInt(res.Id.toString().trim())
        },
        "TipoDocumentoId": {
          "Id": parseInt(TipoDocumentoId.trim())
        }
      }).subscribe(res => {
        console.log('Res info tercero', res);
      })
    })

    this.modalCtrl.dismiss(undefined, undefined, 'modalCreateTercero');
  }
}
