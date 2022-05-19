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

  specificGuestsChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('VALUE SELECTABLE:', event.value);
  }

  filterTerceros(terceros: any[], text: string) {
    console.log(terceros)
    return terceros.filter(tercero => {
      return tercero.UsuarioWSO2.toLowerCase().indexOf(text) !== -1 ||
        tercero.UsuarioWSO2.toLowerCase().indexOf(text) !== -1 ||
        tercero.Id.toString().toLowerCase().indexOf(text) !== -1;
    });
  }

  searchTerceros(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
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

    this.tercerosSubscription = this.terceroService.getTercerosAsync().subscribe(terceross => {
      // Subscription will be closed when unsubscribed manually.
      if (this.tercerosSubscription.closed) {
        return;
      }

      event.component.items = this.filterTerceros(terceross, text);
      event.component.endSearch();
    });
  }
}
