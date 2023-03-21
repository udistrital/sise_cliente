import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewCell } from 'ng2-smart-table';
import { ModalguestsComponent } from 'src/app/@theme/components/modals/modalsevents/modalguests/modalguests.component';
import { ModalposterComponent } from '../../../@theme/components/modals/modalposter/modalposter/modalposter.component';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
})

export class GuestsComponent implements OnInit {

  @Input() value;

  constructor(
    public modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    console.log("this.value", this.value);
  }

  async openGuestsModal(guests: any = null) {

    console.log('guests', guests)

    const modal = await this.modalCtrl.create({
      component: ModalguestsComponent,
      keyboardClose: true,
      backdropDismiss: true,
      animated: true,
      id: 'modal-poster',
      componentProps: { guests },
      cssClass: 'fullscreen'
    });

    // modal.onDidDismiss().then(async (data) => {
    //   console.log(data)
    //   await this.setEvents();
    // });

    return await modal.present();

  }

}
