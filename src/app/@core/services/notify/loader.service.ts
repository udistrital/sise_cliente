import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }

  async presentLoading(msg = 'Cargando', duration=undefined) {

    let loaderObj = {
      message: msg,
    }

    if(duration) loaderObj["duration"] = duration

    const loading = await this.loadingController.create(loaderObj);

    await loading.present();
    return loading
  }

  async presentLoadingWithOptions() {

    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    return await loading.present();
  }
}
