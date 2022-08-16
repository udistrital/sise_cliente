import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import * as auth from 'oidc-auth/index.js';

@Injectable({
  providedIn: 'root',
})

export class ImplicitAutenticationService {
  bearer: { headers: HttpHeaders; };

  init(): void {
  }

  public session = null;
  public payload: any;

  constructor() {
    this.bearer = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
      }),
    }
    auth.setGeneral(environment.TOKEN);
  }

  public logout() {
    auth.logout();
    localStorage.clear();
    this.redirectToLogin(false);
    localStorage.clear();
    this.getAuthorizationUrl();
    localStorage.clear();
  }

  public redirectToLogin(bool) {
    auth.live(bool) // false redirige al login
  }

  getAuthorizationUrl(){
    return auth.getAuthorizationUrl();
  }

  getPayload() {
    return auth.getPayload();
  }

  public liveToken() {
    if (auth.live(true)) {
      auth.liveToken();
      return true;
    } else {
      return false;
    }

  }

  public live(bool) {
    return auth.live(bool);
  }

}
