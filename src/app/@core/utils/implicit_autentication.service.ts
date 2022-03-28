import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as auth from 'oidc-auth/index.js';

@Injectable({
  providedIn: 'root',
})
export class ImplicitAutenticationService {
  bearer: { headers: HttpHeaders; };

  init(): any {
  }

  public session = null;
  public payload: any;

  constructor() {
    this.bearer = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
      }),
    };

    auth.setGeneral(environment.TOKEN);
  }

  public logout() {
    // limpiar localstorage y redirigir a login - home
    // validar si da error sino llamarlo
    // localStorage.removeItem('access_token')
    // localStorage.removeItem('id_token')
    // localStorage.removeItem('state')
    // localStorage.removeItem('expires_in')
    // localStorage.removeItem('expires_at')
    // localStorage.clear();
    // window.location.href = "/"
    auth.clearStorage()
    // auth.logout()
    // localStorage.clear();
    // window.location.href = "/"
    // if(!auth.logout()) {
    // }
  }

  getPayload() {
    return auth.getPayload();
  }

  public live() {
    if (auth.live(true)) {
      auth.liveToken();
      return true;
    } else {
      return false;
    }
  }

  public getAuthorizationUrl(button): string {
    return auth.live(button);
  }

}