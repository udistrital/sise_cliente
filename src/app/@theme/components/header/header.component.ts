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
  styleUrls: ['header.component.scss']
})

export class HeaderComponent {

  public isRemainder: any;
  private autenticacion = new ImplicitAutenticationService;
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

    //   private sidebarService: NbSidebarService,
    //  private menuService: NbMenuService,
    //  private analyticsService: AnalyticsService,
    private router: Router,
    //  public notificacionService: NotificacionesService,
    //  public translate: TranslateService

  ) {
    this.isRemainder = 0
    this.initializeApp();
    this.liveToken();
  }

  liveToken() {
    if (this.autenticacion.live()) {
      this.liveTokenValue = this.autenticacion.live();
      this.username = (this.autenticacion.getPayload()).sub;
    }
    return this.autenticacion.live();
  }
 
  onContecxtItemSelection(title) {
    if (title === 'ver todas') {
      this.router.navigate(['/pages/notificacion/listado']);
    }
  }
 
  logout() {
    this.autenticacion.logout();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
