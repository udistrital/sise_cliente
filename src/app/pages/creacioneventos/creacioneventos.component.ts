import { Component, OnInit } from '@angular/core';
import { ModalneweventComponent } from '../../@theme/components/modals/modalsevents/modalnewevent/modalnewevent/modalnewevent.component';
import { ModalService } from '../../@core/services/modal.service';

@Component({
  selector: 'app-creacioneventos',
  templateUrl: './creacioneventos.component.html',
  styleUrls: ['./creacioneventos.component.scss'],
})

export class CreacioneventosComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit() { }

  openNewEventModal(){
    this.modalService.openModal(ModalneweventComponent, 'modal-new-event');
  }

}
