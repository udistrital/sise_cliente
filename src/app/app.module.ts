import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImplicitAutenticationService } from './@core/utils/implicit_autentication.service';
// import { ComponentsModule } from './@theme/components/components.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { InfoPersonalService } from './@core/services/infopersonal.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    // NgSelectModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    CommonModule,
    Ng2SmartTableModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    // AgmCoreModule.forRoot({
    //   apiKey: environment.MAPSKEY
    // }),
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    // InfoPersonalService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: LocationStrategy, useClass: PathLocationStrategy },
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // { provide: APP_BASE_HREF, useValue: '/' }
    // ImplicitAutenticationService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
