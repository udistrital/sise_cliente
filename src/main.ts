/**
* @license
* Copyright Akveo. All Rights Reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('Se ejecutó el servicio de autenticación');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
