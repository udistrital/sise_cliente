import { Injectable } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { TerceroService } from '../tercero/tercero.service';

@Injectable({
  providedIn: 'root'
})
export class SelectableService {

  tercerosSubscription: Subscription;

  constructor(private terceroService: TerceroService) { }

  specificGuestsChange(
    event: {
      component: IonicSelectableComponent,
      value: any
    },
    fieldTextKey: string = "UsuarioWSO2"
  ) {
    console.log('VALUE SELECTABLE:', event.value);
    let emails = []
    event.value.forEach(guest => {
      if (!emails.includes(guest[fieldTextKey])) {
        emails.push(guest[fieldTextKey])
      }
    })

    console.log('EMAILS INVITADOS: ', emails);

    return emails
  }

  filterTerceros(data: any[], text: string, fieldTextKey: string) {
    console.log('data')
    console.log(data, text, fieldTextKey)
    return data.filter(dato => {
      return dato[fieldTextKey].toLowerCase().indexOf(text) !== -1 ||
        dato[fieldTextKey].toLowerCase().indexOf(text) !== -1 ||
        dato.Id.toString().toLowerCase().indexOf(text) !== -1;
    });
  }

  searchIonSelectable(
    event: {
      component: IonicSelectableComponent,
      text: string
    },
    dataApi,
    fieldTextKey
  ) {
    console.log(event)
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.tercerosSubscription) {
      this.tercerosSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.tercerosSubscription) {
        this.tercerosSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    // this.tercerosSubscription = this.terceroService.getUsuariosWSO2AndId().subscribe(terceross => {
    // Subscription will be closed when unsubscribed manually.
    // if (this.tercerosSubscription.closed) {
    //   return;
    // }

    event.component.items = this.filterTerceros(dataApi, text, fieldTextKey);
    event.component.endSearch();
    // });
  }
}
