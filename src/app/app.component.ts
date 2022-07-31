import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { ImplicitAutenticationService } from './@core/utils/implicit_autentication.service';
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

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
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        gtag('config', 'G-RBY2GQV40M',
                {
                  'page_path': event.urlAfterRedirects
                }
               );
       }
    }
 )
    this.isRemainder = 0
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

  ngAfterViewInit() {
  }

}
