import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImplicitAutenticationService } from '../../@core/utils/implicit_autentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-uui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private autenticacion: ImplicitAutenticationService,    private router: Router) { }
  appname = 'sga';
  basePathAssets = 'https://pruebasassets.portaloas.udistrital.edu.co/'
  @Input('isloading') isloading: boolean = false;
  @Output('loginEvent') loginEvent: EventEmitter<any> = new EventEmitter();

  login() {
    this.isloading = true;
    this.loginEvent.next('clicked');
    this.autenticacion.login(false);

    console.log('hola');
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('access_token'));

    if (localStorage.getItem('access_token')) {
      alert('true')
      this.router.navigate(['/pages/home']);
    }
    // else {
    //   alert('false')
    // }
  }

}
