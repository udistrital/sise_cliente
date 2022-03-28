import { TerceroHerlper } from './../../@core/helpers/Tercero/terceroHelper';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, LoadingController } from '@ionic/angular'
import { ActionSheetController } from '@ionic/angular';
import { __await } from 'tslib';
import { MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { InfoComplementariaTercero } from '../../@core/data/models/info_complementaria_tercero';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { Documento } from '../../@core/data/models/document';

class DataInfoTercero {
  Id?: number | string = "";
  NombreCompleto?: string = "";
  LugarOrigen?: string = "";
  FechaNacimiento?: string = "";
  TipoDocumento?: string = "";
  Genero?: string = "";
  EstadoCivil?: string = "";
  UsuarioWSO2?: string = "";
  Celular?: string = "";
}

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.page.html',
  styleUrls: ['./info-personal.page.scss'],
})

export class InfoPersonalPage implements OnInit {

  private autenticacion = new ImplicitAutenticationService;
  // loadFormDataFunction: (...params) => Observable<any>;
  dataTercero: any[] = [];
  dataInfo: DataInfoTercero = new DataInfoTercero();
  dataInfoTercero: any;
  dateBirth: any;
  idPersonalInfo: any
  arrPersonalInfo: any
  arrMaritalStatus: any
  datosGenero: InfoComplementariaTercero;

  constructor(
    private terceroHerlper: TerceroHerlper,
    private readonly infoPersonalService: InfoPersonalService
  ) { }

  async ngOnInit() {

    const { email } = this.autenticacion.getPayload()
    console.log(this.autenticacion.getPayload());

    const body = { "user": email };
    this.dataInfo.UsuarioWSO2 = email

    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    if (!documento) {
      console.log("Something went wrong, when try to get the identification");
      return
    }

    // Setear generos
    let maritalStatus = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria/?query=GrupoInfoComplementariaId.Id:${environment.ID_GRUPO_ESTADO_CIVIL}` + `&fields=Id,Nombre`).toPromise();

    this.arrMaritalStatus = maritalStatus
    console.log('civul status', maritalStatus)

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()

    this.arrPersonalInfo = data

    console.log(data, rest)

    this.dataInfo.NombreCompleto = data[0].TerceroId.NombreCompleto as string;
    this.dataInfo.TipoDocumento = documento_compuesto.substring(0, 2);
    this.dataInfo.Id = documento_compuesto.substring(2);
    this.dataInfo.FechaNacimiento = new Date(data[0].TerceroId.FechaNacimiento).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
    this.dataInfo.LugarOrigen = data[0].TerceroId.LugarOrigen as string;
    
    // Obtenemos info de contacto
    // const contactInfo = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_CELULAR}`).toPromise();
    // this.dataInfo.Celular =
    
    const Id = data[0].TerceroId.Id as number; // id del tercero
    this.idPersonalInfo = Id

    console.log('ID DEL TERCERO ', Id)
    await this.getDataInfoComplementariaTercero(environment.IDS_INFO_COMPLEMENTARIA_ESTADO_CIVIL, 'EstadoCivil')
    await this.getDataInfoComplementariaTercero(environment.IDS_INFO_COMPLEMENTARIA_GENERO, 'Genero')
  }

  async getDataInfoComplementariaTercero(arrIds: any, fieldToSet: any) {
    arrIds.forEach(async id => {
      let data = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=TerceroId.Id:${this.idPersonalInfo}` + `,InfoComplementariaId.Id:${id}`).toPromise();

      if (Object.keys(data[0]).length > 0) {

        console.log('data[0]', data[0]);
        this.dataInfo[fieldToSet] = data[0].InfoComplementariaId.Nombre.trim().toUpperCase();
        return true;
      }
    });

    return;
  }

  compareObject(o1: any, o2: any) {
    console.log(o1, o2);
    // return o1 && o2 ? o1.id === o2.id : o1 === o2;
    return o1?.Nombre === this.dataInfo?.EstadoCivil;
  }

  private cleanInfoToUpdate({
    Numero,
    DigitoVerificacion,
    FechaExpedicion,
    CiudadExpedicion,
    Activo,
    DocumentoSoporte,
    FechaCreacion,
    FechaModificacion
  }) {
    return {
      Numero,
      DigitoVerificacion,
      FechaExpedicion: new Date(FechaExpedicion).toISOString(),
      CiudadExpedicion,
      Activo,
      DocumentoSoporte,
      FechaCreacion: new Date(FechaCreacion).toISOString(),
      FechaModificacion: new Date(FechaModificacion).toISOString()
    }
  }

  async getInfoTercero(id: any) {
    this.dataInfo = await this.terceroHerlper.getTerceros(id).toPromise();
    this.getDateBirth();
  }

  getDateBirth() {
    const d = new Date(this.dataInfo.FechaNacimiento);
    const ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('es', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(d);
    this.dateBirth = da + '-' + mo + '-' + ye;
  }

  updatePersonalInfo() {

    if (this.idPersonalInfo && this.arrPersonalInfo) {
      console.log('this.arrPersonalInfo', this.arrPersonalInfo)

      // this.infoPersonalService.updateInformation(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT + `/${this.idPersonalInfo}`, this.cleanInfoToUpdate({ ...this.arrPersonalInfo }))
      //   .subscribe((data) => {
      //     console.log(data, "Resultado de la actualizacion");
      //   })
    } else {
      alert("Espera a que cargue la información.")
    }
  }
}







