import { Component, OnInit } from '@angular/core';
import { ModalneweventComponent } from '../../@theme/components/modals/modalsevents/modalnewevent/modalnewevent/modalnewevent.component';
import { ModalService } from '../../@core/services/modal.service';

@Component({
  selector: 'app-creacioneventos',
  templateUrl: './creacioneventos.component.html',
  styleUrls: ['./creacioneventos.component.scss'],
})

export class CreacioneventosComponent implements OnInit {

  public rows: any;
  public col: any;

  constructor(public modalService: ModalService) {

    this.col = [
      { name: 'Name' },
      { name: 'Username' },
      { name: 'email' }
    ];

    this.rows = [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv"
      },
      {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net"
      },
      {
        "id": 4,
        "name": "Patricia Lebsack",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org"
      },
      {
        "id": 5,
        "name": "Chelsey Dietrich",
        "username": "Kamren",
        "email": "Lucio_Hettinger@annie.ca"
      },
      {
        "id": 6,
        "name": "Mrs. Dennis Schulist",
        "username": "Leopoldo_Corkery",
        "email": "Karley_Dach@jasper.info"
      },
      {
        "id": 7,
        "name": "Kurtis Weissnat",
        "username": "Elwyn.Skiles",
        "email": "Telly.Hoeger@billy.biz"
      },
      {
        "id": 8,
        "name": "Nicholas Runolfsdottir V",
        "username": "Maxime_Nienow",
        "email": "Sherwood@rosamond.me"
      },
      {
        "id": 9,
        "name": "Glenna Reichert",
        "username": "Delphine",
        "email": "Chaim_McDermott@dana.io"
      },
      {
        "id": 10,
        "name": "Clementina DuBuque",
        "username": "Moriah.Stanton",
        "email": "Rey.Padberg@karina.biz"
      },
      {
        "id": 11,
        "name": "Ava John",
        "username": "Ava_John",
        "email": "ava@gmail.com"
      },
      {
        "id": 12,
        "name": "Nosy Neighbour",
        "username": "Nosy_Neighbour",
        "email": "nosy@yahoo.com"
      },
      {
        "id": 13,
        "name": "John Doe",
        "username": "<button>asdasd</button>",
        "email": "john@doe.me"
      }
    ];
  }

  ngOnInit() { }

  openNewEventModal() {
    this.modalService.openModal(ModalneweventComponent, 'modal-new-event');
  }

}
