import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalCtrl: ModalController) { }

  async openModal(component, id) {
    const modal = await this.modalCtrl.create({
      component: component,
      keyboardClose: false,
      backdropDismiss: false,
      animated: true,
      id,
    });

    return await modal.present();
  }

  dismiss(modalId:any) {
    this.modalCtrl.dismiss(undefined, undefined, modalId);
  }
}
