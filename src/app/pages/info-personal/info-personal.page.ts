import { TerceroHerlper } from './../../@core/helpers/Tercero/terceroHelper';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { __await } from 'tslib';
import { environment } from '../../../environments/environment';
import { InfoComplementariaTercero } from '../../@core/data/models/info_complementaria_tercero';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { Documento } from '../../@core/data/models/document';
import { DataInfoTercero } from '../../@core/data/models/data_info_tercero';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { NgForm } from '@angular/forms';
import { InfoPersonal } from '../../@core/data/models/info_personal_tercero';
import { SelectableService } from '../../@core/services/search/selectable.service';
import codigospaisesconcdn from '../../../assets/paises/codigospaisesconcdn.json';
import { TerceroService } from '../../@core/services/tercero/tercero.service';
import { ToastService } from '../../@core/services/notify/toast.service';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.page.html',
  styleUrls: ['./info-personal.page.scss'],
})

export class InfoPersonalPage implements OnInit {

  private autenticacion = new ImplicitAutenticationService;
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
  selectedData: InfoPersonal
  selectableUtils: any
  codigospaises: any
  testSelectableData: any
  env: any
  attr: any
  sessionTerceroID: any
  @ViewChildren('formElem', { read: ElementRef }) myFormElems: QueryList<ElementRef>;

  constructor(
    private readonly terceroService: TerceroService,
    private selectableService: SelectableService,
    private terceroHerlper: TerceroHerlper,
    private readonly infoPersonalService: InfoPersonalService,
    private loaderService: LoaderService,
    public toastService: ToastService,
  ) {
    this.testSelectableData = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
    this.codigospaises = codigospaisesconcdn;
    this.selectableUtils = this.selectableService
    this.selectedData = new InfoPersonal();
    this.env = environment.INFO_COMPLEMENTARIA_IDS
  }

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
    this.selectedData.CorreoInstitucional = email

    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    console.log(rest)
    if (!documento) {
      console.log("Something went wrong, when try to get the identification");
      return
    }

    // Setear generos
    let maritalStatus = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria/?query=GrupoInfoComplementariaId.Id:${environment.GRUPO_INFO_COMPLEMENTARIA_IDS.ESTADO_CIVIL}` + `&fields=Id,Nombre`).toPromise();


    let civilStatusArr = []

    maritalStatus.forEach(civilStatus => {
      civilStatusArr.push({
        Id: civilStatus.Id,
        Nombre: civilStatus.Nombre
          .charAt(0)
          .toUpperCase()
          .concat(civilStatus.Nombre.toLowerCase().substring(1, civilStatus.Nombre.length))
          .replace(/UnIon/ig,"Unión")
      })
    })

    this.arrMaritalStatus = civilStatusArr

    // Setear Municipios
    let municipalities = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria/?query=GrupoInfoComplementariaId.Id:${environment.GRUPO_INFO_COMPLEMENTARIA_IDS.MUNICIPIOS}` + `&fields=Id,Nombre`).toPromise();
    this.arrMunicipalities = municipalities

    // Setear Localidades
    let localities = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria/?query=GrupoInfoComplementariaId.Id:${environment.GRUPO_INFO_COMPLEMENTARIA_IDS.LOCALIDADES}` + `&fields=Id,Nombre`).toPromise();
    this.arrLocalities = localities

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()

    const Id = data[0].TerceroId.Id as number; // id del tercero
    this.sessionTerceroID = Id
    this.idPersonalInfo = Id
    this.arrPersonalInfo = data
    console.log('data', data)

    this.dataInfo.NombreCompleto = data[0].TerceroId.NombreCompleto as string;
    this.selectedData.TipoIdentificacion = documento_compuesto.substring(0, 2);
    this.selectedData.NumeroDocumento = documento_compuesto.substring(2);
    this.selectedData.FechaNacimiento = new Date(data[0].TerceroId.FechaNacimiento).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, -9)
    this.selectedData.LugarNacimiento = data[0].TerceroId.LugarOrigen as string;

    // Obtenemos info de contacto
    // setear celular
    // const celular = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.CELULAR},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.Celular = celular[0].Dato

    // setear correo personal
    // const correoPersonal = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.CORREO_PERSONAL},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.CorreoPersonal = JSON.parse(correoPersonal[0].Dato).Data

    // setear DIRECCIÓN
    // const direccionAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.DIRECCION},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.DireccionResidencia = JSON.parse(direccionAPIResults[0].Dato).DIRECCIÓN

    // // setear RED SOCIAL 1
    // const redSocialUnoAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.RED_SOCIAL_UNO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.RedSocialUno = JSON.parse(redSocialUnoAPIResults[0].Dato).Data

    // // setear RED SOCIAL 2
    // const redSocialDosAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.RED_SOCIAL_DOS},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.RedSocialDos = JSON.parse(redSocialDosAPIResults[0].Dato).Data

    // setear nacionalidad
    // const nacionalidadAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.NACIONALIDAD},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.Nacionalidad = JSON.parse(nacionalidadAPIResults[0].Dato).Data

    // setear lugar de nacimiento
    // const lugarNacimientoAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.LUGAR_NACIMIENTO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.LugarNacimiento = JSON.parse(lugarNacimientoAPIResults[0].Dato).Data

    // setear pais
    // const PaisAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.PAIS_RESIDENCIA},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.PaisResidencia = JSON.parse(PaisAPIResults[0].Dato).Data

    // Setear dpto
    // const dptoAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.DEPARTAMENTO_RESIDENCIA},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.DepartamentoResidencia = JSON.parse(dptoAPIResults[0].Dato).Data

    // Setear código del país
    // const countryCodeAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.CODIGO_DEL_PAIS},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // console.log(countryCodeAPIResults)
    // let codigoPaisDato = JSON.parse(countryCodeAPIResults[0].Dato).Data
    // this.selectedData.CodigoPais = codigoPaisDato

    // setear LOCALIDAD
    // const localitiesIDS = await this.getICIdsByGIC(environment.GRUPO_INFO_COMPLEMENTARIA_IDS.LOCALIDADES)
    // await this.getDataInfoComplementariaTercero(localitiesIDS, 'LocalidadResidencia', 'Id')

    // setear Municipio
    // await this.getDataInfoComplementariaTercero(environment.INFO_COMPLEMENTARIA_IDS.MUNICIPIOS, 'MunicipioResidencia', 'Nombre')
    // setTimeout(() => {
    //   console.log('this.dataInfo', this.dataInfo)
    // }, 3000);

    // setear intereses
    // const InteresesAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.INTERESES},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.Intereses = JSON.parse(InteresesAPIResults[0].Dato).Data.split(',')

    console.log('ID DEL TERCERO ', Id)
    // const civilStatusSetting = await this.getDataInfoComplementariaTercero(environment.INFO_COMPLEMENTARIA_IDS.ESTADO_CIVIL, 'EstadoCivil')

    // const StratumSetting = await this.getDataInfoComplementariaTercero(environment.INFO_COMPLEMENTARIA_IDS.ESTRATO, 'Estrato', 'Nombre')
    // this.selectedData.Estrato = StratumSetting ? StratumSetting.replace('Estrato ', '') : '';

    await this.getDataInfoComplementariaTercero(environment.INFO_COMPLEMENTARIA_IDS.GENERO, 'Genero', 'Nombre')

    // const academicaIDS = await this.getICIdsByGIC(environment.GRUPO_INFO_COMPLEMENTARIA_IDS.ACADEMICA)

    // console.log(academicaIDS)
    await this.setValueFields();

    loader.dismiss()
  }

  async setValueFields() {
    let loader = await this.loaderService.presentLoading('Cargando información personal 😉')

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    if (!documento)
      return

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()

    this.sessionTerceroID = data[0].TerceroId.Id as number;

    // SETEO DE VALORES DE LOS CAMPOS
    let onlyNumsRegex = /(\d+)/g, numsGuion = /[0-9-]+$/g, detectGuion = /[-]+$/g, terceroID = this.sessionTerceroID, infoPersonalServ = this.infoPersonalService, fieldsData = this.selectedData

    this.myFormElems.forEach(async function (form: ElementRef) {
      const formElement = form.nativeElement;

      let filter = Array.prototype.filter
      await filter.call(formElement, async function (node) {

        let flagMultipleIonSelect = node.name.match(detectGuion)
        let fieldName = node.name.replace(numsGuion, '').trim()
        if (!fieldName || ["TipoIdentificacion", "NumeroDocumento", "Genero", "FechaNacimiento"].includes(fieldName)) return false;

        console.log('fieldName', fieldName);

        let icID = node.name.match(onlyNumsRegex)
        icID = icID && icID.length > 0 && icID[0] ? parseInt(icID[0]) : null
        if (!icID) return;

        let data = await infoPersonalServ.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=TerceroId.Id:${terceroID}` + `,InfoComplementariaId.Id:${icID}`).toPromise();

        if (data && data.length > 0 && data[0].Dato && typeof data[0].Dato == 'string' && JSON.parse(data[0].Dato).Data && JSON.parse(data[0].Dato).Data != "\"") {

          let dato = JSON.parse(data[0].Dato).Data
          if (flagMultipleIonSelect) {
            fieldsData[fieldName] = dato.split(',')
          } else {
            if (dato == "on") dato = true
            if (dato == "off") dato = false
            fieldsData[fieldName] = dato
          }

        }
      });
    });

    Object.assign({}, this.selectedData, fieldsData)
    console.log(this.selectedData, 'this.selectedData');

    loader.dismiss()
  }

  onChange(selectValue, id) {

    // console.log(this.selectedData);
    console.log('selectValue: ', selectValue)
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
          this.selectedData[fieldToSet] = data[0].InfoComplementariaId[fieldToGet].replace('Estrato ', '')
        } else {
          this.dataInfo[fieldToSet] = data[0].InfoComplementariaId[fieldToGet]
          this.selectedData[fieldToSet] = data[0].InfoComplementariaId[fieldToGet]
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

  async getInfoTercero(id: any) {
    this.dataInfo = await this.terceroHerlper.getTerceros(id).toPromise();
    this.getDateBirth();
  }

  getDateBirth() {
    const d = new Date(this.selectedData.FechaNacimiento);
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
      //     console.log(data, "Resultado de la actualización");
      //   })
    } else {
      alert("Espera a que cargue la información.")
    }
  }

  async handleForm(formNg: NgForm) {

    let loader = await this.loaderService.presentLoading('Enviando información personal 😉')
    let terceroID = this.sessionTerceroID
    let infoPersonalServ = this.infoPersonalService
    let infoTercero = this.terceroService
    let onlyNumsRegex = /(\d+)/g

    this.myFormElems.forEach(async function (form: ElementRef) {
      const formElement = form.nativeElement;

      let filter = Array.prototype.filter
      await filter.call(formElement, async function (node) {

        let icID = node.name.match(onlyNumsRegex)

        icID = icID && icID.length > 0 && icID[0] ? parseInt(icID[0]) : null
        if (!icID) return;
        if (!node.value) return;

        let bodyValue = node.value


        if (Array.isArray(JSON.parse(JSON.stringify(node.value)))) {
          bodyValue = JSON.stringify(node.value)
        } else if (Number(node.value)) {
          bodyValue = node.value.toString().trim()
        }

        if (!bodyValue) return;

        let ictBody = {
          "Activo": true,
          "Dato": "{\"Data\": \"" + bodyValue + "\"}",
          "Id": null,
          "InfoCompleTerceroPadreId": null,
          "InfoComplementariaId": {
            "Id": icID
          },
          "TerceroId": {
            "Id": terceroID
          }
        }

        let data = await infoPersonalServ.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=TerceroId.Id:${terceroID}` + `,InfoComplementariaId.Id:${icID}`).toPromise();

        if (data && data.length > 0 && data[0] && Object.keys(data[0]).length > 0) {
          // put
          await infoPersonalServ.updateInformation(environment.TERCEROS_SERVICE + `/info_complementaria_tercero/${data[0].Id}`, ictBody).toPromise();

        } else {
          // post
          await infoTercero.saveDataTercero(`/info_complementaria_tercero`, ictBody).toPromise();
        }
      });

    });

    loader.dismiss()
    this.toastService.presentToast("Información personal actualizada con exito ✅")
    await this.setValueFields();
  }
}