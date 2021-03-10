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
  dataTercero: any;
  constructor(
    private terceroHerlper: TerceroHerlper
  ) { }


  async ngOnInit() {
    const loadFormDataFunction = await this.terceroHerlper.getTerceros('264').toPromise();
    // this.loadFormDataFunction = this.terceroHerlper.getTerceros;
    this.dataTercero = JSON.stringify(loadFormDataFunction);
    console.log(this.dataTercero);
    // console.log(typeof this.data);
    // console.log(this.loadFormDataFunction);
    // this.getPosts();
  }


  // getPosts() { //llamamos a la funcion getPost de nuestro servicio.
  //   this.terceroHerlper.getTerceros('264').toPromise().then(data => {
  //     this.dataTercero = data;
  //   });
  // }
}







