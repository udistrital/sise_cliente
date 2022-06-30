import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { environment } from '../../../environments/environment';
import { InfoLaboral } from '../../@core/data/models/info_laboral_tercero';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { Documento } from '../../@core/data/models/document';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { TerceroService } from '../../@core/services/tercero/tercero.service';
import { DataInfoTercero } from '../../@core/data/models/data_info_tercero';

@Component({
  selector: 'app-info-laboral',
  templateUrl: './info-laboral.page.html',
  styleUrls: ['./info-laboral.page.scss'],
})

export class InfoLaboralPage implements OnInit {

  private autenticacion = new ImplicitAutenticationService;

  @ViewChildren('formElem', { read: ElementRef }) myFormElems: QueryList<ElementRef>;

  selectedData: InfoLaboral
  env: any
  attr: any
  sessionTerceroID: any
  dataInfo: DataInfoTercero = new DataInfoTercero();
  // test: any

  constructor(
    private readonly infoPersonalService: InfoPersonalService,
    private readonly terceroService: TerceroService,
    private loaderService: LoaderService
  ) {
    this.selectedData = new InfoLaboral();
    this.env = environment.INFO_COMPLEMENTARIA_IDS
    // this.test = [
    //   "probecon", "probcult"
    // ]
  }

  async ngOnInit() {
    await this.setValueFields();
  }

  async setValueFields() {
    let loader = await this.loaderService.presentLoading('Cargando información laboral')

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    if (!documento) 
      return

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()

    this.dataInfo.NombreCompleto = data[0].TerceroId.NombreCompleto as string;
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

    setTimeout(() => {
      loader.dismiss()
    }, 1000);
  }

  onChange(selectValue, id) {

    // console.log(this.selectedData);
    console.log('selectValue: ', selectValue)
  }

  async handleForm(formNg: NgForm) {

    let loader = await this.loaderService.presentLoading('Enviando información laboral')
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
    await this.setValueFields();
  }

}
