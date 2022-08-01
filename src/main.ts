import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ImplicitAutenticationService } from './app/@core/utils/implicit_autentication.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader'


if (environment.production) {
  enableProdMode();
}

// const autenticacion = new ImplicitAutenticationService;
// const isButtonLogin = false;

// if (!autenticacion.getAuthorizationUrl(isButtonLogin)) {
// } else {
//   autenticacion.live();
// }


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
