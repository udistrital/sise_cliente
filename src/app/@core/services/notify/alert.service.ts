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

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      message: 'Confirm purchase',
      subHeader: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    await alert.present();
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
