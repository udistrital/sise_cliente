import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { environment } from '../../../environments/environment';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { Documento } from '../../@core/data/models/document';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { InfoAcademica } from '../../@core/data/models/info_academica_tercero';
import { DataInfoTercero } from '../../@core/data/models/data_info_tercero';
import { TerceroService } from '../../@core/services/tercero/tercero.service';
import { NgForm } from '@angular/forms';
import { ToastService } from '../../@core/services/notify/toast.service';

@Component({
  selector: 'app-info-academica',
  templateUrl: './info-academica.page.html',
  styleUrls: ['./info-academica.page.scss'],
})
export class InfoAcademicaPage implements OnInit {

  idPersonalInfo: any
  posgradosUD: any
  selectedData: InfoAcademica

  dataInfo: DataInfoTercero = new DataInfoTercero();
  env: any
  attr: any
  sessionTerceroID: any
  @ViewChildren('formElem', { read: ElementRef }) myFormElems: QueryList<ElementRef>;

  constructor(
    private readonly terceroService: TerceroService,
    private readonly infoPersonalService: InfoPersonalService,
    private loaderService: LoaderService,
    private autenticacion: ImplicitAutenticationService,
    public toastService: ToastService
  ) {
    this.selectedData = new InfoAcademica();
    this.env = environment.INFO_COMPLEMENTARIA_IDS
  }

  async ngOnInit() {
    let loader = await this.loaderService.presentLoading('Cargando información academica 🎓')

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    if (!documento) {
      console.log("Something went wrong, when try to get the identification");
      return
    }

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()
    const Id = data[0].TerceroId.Id as number; // id del tercero
    this.sessionTerceroID = Id
    this.idPersonalInfo = Id

    this.dataInfo.NombreCompleto = data[0].TerceroId.NombreCompleto as string;

    // setear nombre colegio
    // const nombreColegioAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.NOMBRE_COLEGIO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.NombreColegio = JSON.parse(nombreColegioAPIResults[0].Dato).Data

    // setear nombre colegio
    // const ciudadColegioAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.CIUDAD_COLEGIO},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.CiudadColegio = JSON.parse(ciudadColegioAPIResults[0].Dato).Data

    // setear nombre colegio
    // const fechaGraduacionColegioAPIResults = await this.infoPersonalService.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=InfoComplementariaId.Id:${environment.INFO_COMPLEMENTARIA_IDS.FECHA_GRADUACION},TerceroId.Id:${this.idPersonalInfo}`).toPromise();
    // this.selectedData.FechaGraduacion = JSON.parse(fechaGraduacionColegioAPIResults[0].Dato).Data;

    // Seteo de posgrados UD
    const posgrados = await this.infoPersonalService.getInfoComplementariaTercero(environment.OIKOS_SERVICE, `dependencia?query=DependenciaTipoDependencia.TipoDependenciaId.Id:${environment.OIKOS_POSGRADOS_ID}&limit=-1`).toPromise();

    let posgradosArr = []

    posgrados.forEach(posgrado => {
      posgradosArr.push({
        Id: posgrado.Id,
        Nombre: posgrado.Nombre
          .charAt(0)
          .toUpperCase()
          .concat(posgrado.Nombre.toLowerCase().substring(1, posgrado.Nombre.length))
      })
    })

    this.posgradosUD = posgradosArr
    // TipoDependenciaId
    await this.setValueFields();

    loader.dismiss()

  }

  async setValueFields() {
    let loader = await this.loaderService.presentLoading('Cargando información academica 🎓')

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
        if (!fieldName) return;

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

  async handleForm(formNg: NgForm) {

    let loader = await this.loaderService.presentLoading('Enviando información academica 🎓')
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
    this.toastService.presentToast("Información academica actualizada con exito ✅")

    await this.setValueFields();
  }

}
