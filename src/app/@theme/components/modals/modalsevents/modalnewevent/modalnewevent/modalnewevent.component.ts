import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '../../../../../../@core/services/modal.service';
import { Event } from '../../../../../../@core/data/models/event';

@Component({
  selector: 'app-modalnewevent',
  templateUrl: './modalnewevent.component.html',
  styleUrls: ['./modalnewevent.component.scss'],
})
export class ModalneweventComponent implements OnInit {

  selectedEvent: Event

  constructor(public modalService: ModalService) {
    this.selectedEvent = new Event(); // iNICIALIZANDO VARIABLE CON UNA TAREA
  }

  ngOnInit() { }

  addEvent(form: NgForm) {
    console.log(form);

    let { Title, Fecha, Lugar, Invitados } = form.value

    console.log(Title, Fecha, Lugar, Invitados)
  }

  dismissModal(modalId:any){
    this.modalService.dismiss(modalId);
  }

}
