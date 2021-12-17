import { TerceroHerlper } from './../../@core/helpers/Tercero/terceroHelper';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, LoadingController } from '@ionic/angular'
import { ActionSheetController } from '@ionic/angular';
import { __await } from 'tslib';
import { MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.page.html',
  styleUrls: ['./info-personal.page.scss'],
})




export class InfoPersonalPage implements OnInit {
  // loadFormDataFunction: (...params) => Observable<any>;
  dataTercero: any[] = [];
  dataInfo: any;
  dataInfoTercero: any;
  dateBirth: any;
  constructor(
    private terceroHerlper: TerceroHerlper
  ) { }


  async ngOnInit() {
    // const loadFormDataFunction = await this.terceroHerlper.getTerceros('264').toPromise();
    // this.loadFormDataFunction = this.terceroHerlper.getTerceros;
    // this.dataTercero = JSON.stringify(loadFormDataFunction);
    // console.log(this.dataTercero);
    // console.log(typeof this.data);
    // console.log(loadFormDataFunction);
    // this.getPosts();
    this.getInfoTercero('264');

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







