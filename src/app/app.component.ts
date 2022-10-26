import { Component } from '@angular/core';
import { ImplicitAutenticationService } from './@core/utils/implicit_autentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  public isRemainder: any;

  constructor(private autenticacion: ImplicitAutenticationService) {
    this.isRemainder = 0
  }

  logout() {
    const confirm = window.confirm('¿Estás seguro de cerrar sesión?');
    if (confirm) {
      this.autenticacion.logout('from header');
    }
  }

}
