import { TerceroHerlper } from './../../@core/helpers/Tercero/terceroHelper';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, LoadingController } from '@ionic/angular'
import { ActionSheetController } from '@ionic/angular';
import { __await } from 'tslib';
import { MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { InfoPersonalService } from './info-personal.service';
import { environment } from 'src/environments/environment';

interface Documento{
  documento: string;
  documento_compuesto: string;
}
class DataInfoTercero{
  Id?: number | string = "";
  NombreCompleto?:string = "";
  LugarOrigen?:string = "";
  FechaNacimiento?:string = "";
  TipoDocumento?:string = "";
}

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.page.html',
  styleUrls: ['./info-personal.page.scss'],
})

export class InfoPersonalPage implements OnInit {
  // loadFormDataFunction: (...params) => Observable<any>;
  dataTercero: any[] = [];
  dataInfo: DataInfoTercero = new DataInfoTercero();
  dataInfoTercero:any;
  dateBirth: any;
  constructor(
    private terceroHerlper: TerceroHerlper,
    private readonly infoPersonalService: InfoPersonalService
  ) { }

  async ngOnInit() {
    const body = {
      "user": "jgcastellanosj@correo.udistrital.edu.co"
    };
    const { documento, documento_compuesto } = await this.infoPersonalService.getIndentification(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;
    if(!documento){
      console.log("Something went wrong, when try to get the identification");
      return
    }
    const data = await this.infoPersonalService.getInformationByDocument(environment.GET_INFORMATION_BY_INDENTIFICATION, documento).toPromise();
    console.log(data)

    this.dataInfo.NombreCompleto = data[0].TerceroId.NombreCompleto as string;
    this.dataInfo.TipoDocumento = documento_compuesto.substring(0,2);
    this.dataInfo.Id = documento_compuesto.substring(2);
    // const loadFormDataFunction = await this.terceroHerlper.getTerceros('264').toPromise();
    // this.loadFormDataFunction = this.terceroHerlper.getTerceros;
    // this.dataTercero = JSON.stringify(loadFormDataFunction);
    // console.log(this.dataTercero);
    // console.log(typeof this.data);
    // console.log(loadFormDataFunction);
    // this.getPosts();
    // this.getInfoTercero('264');

  }

  // ngOnInit() {
  // }

  // getPosts() { //llamamos a la funcion getPost de nuestro servicio.
  //   this.terceroHerlper.getTerceros('264').toPromise().then(data => {
  //     this.dataTercero = data;
  //   });
  // }

  async getInfoTercero(id: any) {
    this.dataInfo = await this.terceroHerlper.getTerceros(id).toPromise();
    console.log(this.dataInfo);
    this.getDateBirth();
    // this.dataInfo = JSON.stringify(data);
    // console.log(this.dataInfo.Id);
    // console.log(data.Id);
    // for (const [key, value] of Object.entries(data)) {
    //   console.log(key);
    //   console.log(value);
    //   this.dataTercero.push(
    //     key
    //   )
    // }
    // for (var i = 0; i < data.length; i++) {

    //   this.dataInfoTercero.push(
    //     {
    //       job_id: data.Id,
    //       //  job_name: data[i].name,
    //       //  job_desc: data[i].desc
    //     }
    //   );
    // }
    // console.log(this.dataTercero);
    // console.log(this.dataTercero);
  }

  getDateBirth() {
    const d = new Date(this.dataInfo.FechaNacimiento);
    const ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('es', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(d);
    this.dateBirth = da + '-' + mo + '-' + ye;
  }
}







