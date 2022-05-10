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

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
      }),
    };
  }

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

  // async 
  getTerceros(page?: number, size?: number) {
    // const data = await this.httpClient.get<any>(environment.TERCEROS_SERVICE + `/tercero?fields=UsuarioWSO2&limit=-1`, this.getOptions()).toPromise();

    // return data

    return this.httpClient.get<any>(environment.TERCEROS_SERVICE + `/tercero?fields=UsuarioWSO2&limit=-1`, this.getOptions())

    // return data
  }

  getTercerosAsync(): any {
    // return new Observable<any[]>(observer => {
    //   observer.next([this.httpClient.get<any>(environment.TERCEROS_SERVICE + `/tercero?fields=UsuarioWSO2&limit=-1`, this.getOptions())]);
    //   observer.complete();
    // }).pipe(delay(timeout));

    return this.httpClient.get<any>(environment.TERCEROS_SERVICE + `/tercero?fields=UsuarioWSO2,Id&limit=-1`, this.getOptions())
  }
}
