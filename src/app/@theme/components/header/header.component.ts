import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'header-root',
  templateUrl: 'header.component.html',
})

export class HeaderComponent {

  public isRemainder: any;
  @Input() position = 'normal';
  itemClick: Subscription;
  liveTokenValue: boolean = false;
  user: any;
  title: any;
  username = '';
  userMenu = [{ title: 'ver todas', icon: 'fa fa-list' }];
  public noNotify: any = '0';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private autenticacion: ImplicitAutenticationService,
    private router: Router,

  ) {
    this.isRemainder = 0
    this.initializeApp();
  }

  onContecxtItemSelection(title) {
    if (title === 'ver todas') {
      this.router.navigate(['/pages/notificacion/listado']);
    }
  }

  logout() {
    const confirm = window.confirm('¿Estás seguro de cerrar sesión?');
    if (confirm) {
      this.autenticacion.logout('from header');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
