import { Component } from '@angular/core';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { PhotoService } from '../../@core/services/photo.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private autenticacion = new ImplicitAutenticationService;
  
  constructor(  
    public photoService: PhotoService,
    private camera: Camera

  ) {}

  logout(){
    // console.log(this.autenticacion)
    this.autenticacion.logout();
  }

  addPhotoToGallery() {
  this.photoService.addNewToGallery();
  }

  



}
