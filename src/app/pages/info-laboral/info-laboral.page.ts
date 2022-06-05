import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { environment } from '../../../environments/environment';
import { InfoLaboral } from '../../@core/data/models/info_laboral_tercero';
import { InfoPersonalService } from '../../@core/services/infopersonal.service';
import { Documento } from '../../@core/data/models/document';
import { LoaderService } from '../../@core/services/notify/loader.service';
import { TerceroService } from '../../@core/services/tercero/tercero.service';

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
  test:any

  constructor(
    private readonly infoPersonalService: InfoPersonalService,
    private readonly terceroService: TerceroService,
    private loaderService: LoaderService
  ) {
    this.selectedData = new InfoLaboral();
    this.env = environment.INFO_COMPLEMENTARIA_IDS
    this.test = [
      "probecon", "probcult"
    ]
  }

  async ngOnInit() {
    await this.setValueFields();
  }

  async setValueFields() {
    let loader = await this.loaderService.presentLoading('Cargando información laboral')

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    if (!documento) {
      // console.log("Something went wrong, when try to get the identification");
      return
    }

    const data = await this.infoPersonalService.getInformationByDocument(environment.DATOS_IDENTIFICACION_TERCERO_ENDPOINT, documento).toPromise()

    this.sessionTerceroID = data[0].TerceroId.Id as number;

    // SETEO DE VALORES DE LOS CAMPOS
    let onlyNumsRegex = /(\d+)/g
    let numsGuion = /[0-9-]+$/g
    let detectGuion = /[-]+$/g
    let terceroID = this.sessionTerceroID
    let infoPersonalServ = this.infoPersonalService
    let fieldsData = this.selectedData
    this.myFormElems.forEach(async function (form: ElementRef) {
      const formElement = form.nativeElement;

      let filter = Array.prototype.filter
      await filter.call(formElement, async function (node) {

        console.log(node.multiple);
        console.log(node);

        let flagMultipleIonSelect = node.name.match(detectGuion)
        let fieldName = node.name.replace(numsGuion, '').trim()
        if (!fieldName) return;

        let icID = node.name.match(onlyNumsRegex)
        icID = icID && icID.length > 0 && icID[0] ? parseInt(icID[0]) : null
        if (!icID) return;

        let data = await infoPersonalServ.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=TerceroId.Id:${terceroID}` + `,InfoComplementariaId.Id:${icID}`).toPromise();

        // console.log(data)

        if (data && data.length > 0 && JSON.parse(data[0].Dato).Data && JSON.parse(data[0].Dato).Data != "\"") {

          // console.log(JSON.parse(data[0].Dato).Data)
          // console.log(fieldName)
          // if (Array.isArray(JSON.parse(node.value))) {
          //   fieldsData[fieldName] = JSON.parse(JSON.parse(data[0].Dato).Data)
          // } else {
            if(flagMultipleIonSelect){
              fieldsData[fieldName] = JSON.parse(data[0].Dato).Data.split(',')
            }else{
              fieldsData[fieldName] = JSON.parse(data[0].Dato).Data
            }
          // }

        }

        // console.log('HERERER ', fieldsData[fieldName], typeof fieldsData[fieldName]);
        // if (Array.isArray(JSON.parse(node.value))) {
        //   fieldsData[fieldName] = JSON.parse(JSON.parse(data[0].Dato).Data)
        // }

      });
    });

    Object.assign({}, this.selectedData, fieldsData)

    // console.log(this.selectedData)
    loader.dismiss()
  }

  onChange(selectValue, id) {

    // console.log(this.selectedData);
    // console.log('selectValue selectValue',selectValue)
  }

  async handleForm(formNg: NgForm) {

    let loader = await this.loaderService.presentLoading('Enviando información laboral')
    let terceroID = this.sessionTerceroID
    let infoPersonalServ = this.infoPersonalService
    let infoTercero = this.terceroService
    // console.log('this.sessionTerceroID', this.sessionTerceroID)
    let valuesAndIDS = [], onlyNumsRegex = /(\d+)/g

    this.myFormElems.forEach(async function (form: ElementRef) {
      const formElement = form.nativeElement;

      let filter = Array.prototype.filter
      let filtered = filter.call(formElement, async function (node) {
        // console.log('this.sessionTerceroID', terceroID)

        let icID = node.name.match(onlyNumsRegex)

        // console.log('icID', icID, node.name)
        icID = icID && icID.length > 0 && icID[0] ? parseInt(icID[0]) : null
        if (!icID) return;
        // JSON.parse(JSON.stringify(['probambi', 'probsoci'])).join(',')
        if (!node.value) return;

        // console.log('NODE VALUEEEE', node.value)

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

        // console.log(ictBody)

        let data = await infoPersonalServ.getInfoComplementariaTercero(environment.TERCEROS_SERVICE, `/info_complementaria_tercero/?query=TerceroId.Id:${terceroID}` + `,InfoComplementariaId.Id:${icID}`).toPromise();

        // console.log(data)
        if (data && data.length > 0 && data[0] && Object.keys(data[0]).length > 0) {
          // put
          let putICT = await infoPersonalServ.updateInformation(environment.TERCEROS_SERVICE + `/info_complementaria_tercero/${data[0].Id}`, ictBody).toPromise();

          // console.log('putICT', putICT);
        } else {
          // post
          let postICT = await infoTercero.saveDataTercero(`/info_complementaria_tercero`, ictBody).toPromise();

          // console.log('postICT', postICT);
        }
        // console.log(node.name, node.value)

      });

    });

    loader.dismiss()
    await this.setValueFields();
  }

}
