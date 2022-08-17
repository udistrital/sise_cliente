import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Documento } from '../data/models/document';
import { InfoPersonalService } from '../services/infopersonal.service';
import { ImplicitAutenticationService } from '../utils/implicit_autentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,     private infoPersonalService: InfoPersonalService,     private autenticacion: ImplicitAutenticationService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let valid: boolean = false;
    const roles = route.data['roles'] as Array<string>;
    console.log(roles);
    const id_token = window.localStorage.getItem('id_token').split('.');
    const payload = JSON.parse(atob(id_token[1]));
    console.log('payload');
    console.log(payload);

    const { email } = this.autenticacion.getPayload()
    const body = { "user": email };
    const { documento, documento_compuesto, ...rest } = await this.infoPersonalService.getDocumentIdByEmail(environment.API_GET_IDENTIFICATION, body).toPromise() as Documento;

    let rolesArr = rest["role"]

    if (payload && rolesArr) {

      console.log('yeah')
      for (let i = 0; i < rolesArr.length; i++) {
        for (let j = 0; j < roles.length; j++) {
          if (rolesArr[i] === roles[j]) {
            valid = true;
            break;
          }
        }
      }
    }

    if (!valid) {
      // not logged in so redirect to login page with the return url
      // or not exist role return url
      this.router.navigate(['/']);
    }

    return valid;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.canActivate(route, state);
  }

}
