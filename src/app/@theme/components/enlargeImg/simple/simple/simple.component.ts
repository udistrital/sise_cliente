import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewCell } from 'ng2-smart-table';
import { ModalposterComponent } from '../../../modals/modalposter/modalposter/modalposter.component';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})

export class SimpleComponent implements OnInit {

  @Input() value;

  constructor(
  public modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    console.log(this.value);
  }

  async openPictureModal(pictureURL: any = null) {

    console.log('pictureURL', pictureURL)

    const modal = await this.modalCtrl.create({
      component: ModalposterComponent,
      keyboardClose: true,
      backdropDismiss: true,
      animated: true,
      id: 'modal-poster',
      componentProps: { pictureURL },
      cssClass: 'fullscreen'
    });

    // modal.onDidDismiss().then(async (data) => {
    //   console.log(data)
    //   await this.setEvents();
    // });

    return await modal.present();

  }

}
