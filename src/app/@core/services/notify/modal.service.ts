import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalCtrl: ModalController, private readonly httpClient: HttpClient) { }

  async openModal(component, id, rowId: any = null) {
    const modal = await this.modalCtrl.create({
      component: component,
      keyboardClose: false,
      backdropDismiss: false,
      animated: true,
      id,
      componentProps: { rowId }
    });

    return await modal.present();
  }

  dismiss(modalId: any) {
    this.modalCtrl.dismiss(undefined, undefined, modalId);
  }
}
