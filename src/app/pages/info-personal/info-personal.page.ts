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
import { DataInfoTercero } from '../../@core/data/models/data_info_tercero';
import { LoaderService } from '../../@core/services/notify/loader.service';

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
  arrMunicipalities: any
  arrLocalities: any
  datosGenero: InfoComplementariaTercero;
  dpts: any

  constructor(
    private terceroHerlper: TerceroHerlper,
    private readonly infoPersonalService: InfoPersonalService,
    private loaderService: LoaderService
  ) { }

  async ngOnInit() {

    let loader = await this.loaderService.presentLoading('Cargando información personal')

    this.dpts = [
      "Amazonas",
      "Antioquia",
      "Arauca",
      "Archipielago De San Andres",
      "Atlantico",
      "Bogota D.C",
      "Bolivar",
      "Boyaca",
      "Caldas",
      "Caqueta",
      "Casanare",
      "Cauca",
      "Cesar",
      "Choco",
      "Cordoba",
      "Cundinamarca",
      "Guainia",
      "Guaviare",
      "Huila",
      "La Guajira",
      "Magdalena",
      "Meta",
      "Nariño",
      "Norte De Santander",
      "Putumayo",
      "Quindio",
      "Risaralda",
      "Santander",
      "Sucre",
      "Tolima",
      "Valle Del Cauca",
      "Vaupes",
      "Vichada"
    ]

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

    // Setear Municipios
    let municipalities = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria/?query=GrupoInfoComplementariaId.Id:${environment.ID_GRUPO_INFO_COMPLEMENTARIA_MUNICIPIOS}` + `&fields=Id,Nombre`).toPromise();
    this.arrMunicipalities = municipalities

    // Setear Localidades
    let localities = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria/?query=GrupoInfoComplementariaId.Id:${environment.ID_GRUPO_INFO_COMPLEMENTARIA_LOCALIDADES}` + `&fields=Id,Nombre`).toPromise();
    this.arrLocalities = localities

    // Setear Municipios
    // let municipalities = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria/?query=GrupoInfoComplementariaId.Id:${environment.ID_GRUPO_INFO_COMPLEMENTARIA_MUNICIPIOS}` + `&fields=Id,Nombre`).toPromise();
    // this.arrMunicipalities = municipalities
    // console.log('civul status', maritalStatus)

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()

    const Id = data[0].TerceroId.Id as number; // id del tercero
    this.idPersonalInfo = Id
    this.arrPersonalInfo = data

    // console.log(data, rest)
    console.log('data', data)

    this.dataInfo.NombreCompleto = data[0].TerceroId.NombreCompleto as string;
    this.dataInfo.TipoDocumento = documento_compuesto.substring(0, 2);
    this.dataInfo.Id = documento_compuesto.substring(2);
    this.dataInfo.FechaNacimiento = new Date(data[0].TerceroId.FechaNacimiento).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
    this.dataInfo.LugarOrigen = data[0].TerceroId.LugarOrigen as string;

    // Obtenemos info de contacto
    // setear celular
    const celular = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_CELULAR},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.Celular = celular[0].Dato

    // setear correo personal
    const correoPersonal = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_CORREO_PERSONAL},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.CorreoPersonal = JSON.parse(correoPersonal[0].Dato).Data

    // setear DIRECCIÓN
    const direccionAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_DIRECCION},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.Direccion = JSON.parse(direccionAPIResults[0].Dato).DIRECCIÓN

    // setear RED SOCIAL 1
    const redSocialUnoAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_RED_SOCIAL_UNO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.RedSocialUno = JSON.parse(redSocialUnoAPIResults[0].Dato).Data

    // setear RED SOCIAL 2
    const redSocialDosAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_RED_SOCIAL_DOS},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.RedSocialDos = JSON.parse(redSocialDosAPIResults[0].Dato).Data

    // setear nacionalidad
    const nacionalidadAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_NACIONALIDAD},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.Nacionalidad = JSON.parse(nacionalidadAPIResults[0].Dato).Data

    // setear lugar de nacimiento
    const lugarNacimientoAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_LUGAR_NACIMIENTO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.LugarNacimiento = JSON.parse(lugarNacimientoAPIResults[0].Dato).Data

    // setear pais
    const PaisAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_PAIS},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.Pais = JSON.parse(PaisAPIResults[0].Dato).Data

    // Setear dpto
    const dptoAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_DPTO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.Departamento = JSON.parse(dptoAPIResults[0].Dato).Data

    // setear LOCALIDAD
    //  const localidadAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_RED_SOCIAL_DOS},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    //  this.dataInfo.Localidad = JSON.parse(localidadAPIResults[0].Dato).Data
    const localitiesIDS = await this.getICIdsByGIC(environment.ID_GRUPO_INFO_COMPLEMENTARIA_LOCALIDADES)
    await this.getDataInfoComplementariaTercero(localitiesIDS, 'Localidad', 'Id')

    // setear Municipio
    await this.getDataInfoComplementariaTercero(environment.IDS_INFO_COMPLEMENTARIA_MUNICIPIOS, 'Municipio', 'Nombre')
    // const municipioAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.IDS_INFO_COMPLEMENTARIA_MUNICIPIOS},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.dataInfo.LugarNacimiento = JSON.parse(municipioAPIResults[0].Dato).Data
    setTimeout(() => {
      console.log('this.dataInfo', this.dataInfo)
    }, 3000);

    // setear intereses
    const InteresesAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.ID_INFO_COMPLEMENTARIA_INTERESES},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    this.dataInfo.Intereses = JSON.parse(InteresesAPIResults[0].Dato).Data.split(',')


    console.log('ID DEL TERCERO ', Id)
    const civilStatusSetting = await this.getDataInfoComplementariaTercero(environment.IDS_INFO_COMPLEMENTARIA_ESTADO_CIVIL, 'EstadoCivil')

    const StratumSetting = await this.getDataInfoComplementariaTercero(environment.ID_INFO_COMPLEMENTARIA_ESTRATO, 'Estrato', 'Nombre')
    this.dataInfo.Estrato = StratumSetting ? StratumSetting.replace('Estrato ', '') : '';

    await this.getDataInfoComplementariaTercero(environment.IDS_INFO_COMPLEMENTARIA_GENERO, 'Genero', 'Nombre')

    const academicaIDS = await this.getICIdsByGIC(environment.ID_GRUPO_INFO_COMPLEMENTARIA_ACADEMICA)

    console.log(academicaIDS)

    loader.dismiss()
  }

  async getICIdsByGIC(gicID) {
    const arrIC = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria/?query=GrupoInfoComplementariaId.Id:${gicID}`).toPromise();

    let arrICIds = []

    console.log('arrIC')
    console.log(arrIC)
    arrIC.forEach(ic => {
      arrICIds.push(ic.Id)
    })

    console.log('arrICIds')
    console.log(arrICIds)

    return arrICIds;
  }

  async getDataInfoComplementariaTercero(arrIds: any, fieldToSet: any, fieldToGet: any = 'Id'): Promise<any> {
    arrIds.forEach(async id => {
      let data = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=TerceroId.Id:${this.idPersonalInfo}` + `,InfoComplementariaId.Id:${id}`).toPromise();

      if (Object.keys(data[0]).length > 0) {

        console.log('data[0]', data[0]);
        if (fieldToSet === 'Estrato') {
          this.dataInfo[fieldToSet] = data[0].InfoComplementariaId[fieldToGet].replace('Estrato ', '')
        } else {
          this.dataInfo[fieldToSet] = data[0].InfoComplementariaId[fieldToGet]
        }
        // console.log('this.dataInfo', this.dataInfo)
        return data[0].InfoComplementariaId[fieldToGet]
      }

      console.error("Error con el campo " + fieldToSet)
      return false;
    });

    return false;
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







