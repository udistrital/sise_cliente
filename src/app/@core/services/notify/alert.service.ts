import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor(private alertCtrl: AlertController) { }

  async presentAlert() {
    let alert = await this.alertCtrl.create({
      message: 'Low battery',
      subHeader: '10% of battery remaining',
      buttons: ['Dismiss']
    });

    await alert.present();
  }

  async presentConfirm(msg = '¿Estás seguro de la acción que quieres ejecutar?', subHeader = '') {

    let choice

    let alert = await this.alertCtrl.create({
      message: msg,
      subHeader: subHeader,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            return false
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            return true
          }
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data
    })
    return choice
  }

  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      message: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log('Login clicked');
          }
        }
      ]
    });

    await alert.present();
  }
}
