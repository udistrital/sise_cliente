import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SimpleComponent } from '../@theme/components/enlargeImg/simple/simple/simple.component';
import { HeaderComponent } from '../@theme/components/header/header.component';
import { ModalbasicinfoComponent } from '../@theme/components/modals/modalbasicinfo/modalbasicinfo.component';
import { ModalbirthdayComponent } from '../@theme/components/modals/modalbirthday/modalbirthday.component';
import { ModalposterComponent } from '../@theme/components/modals/modalposter/modalposter/modalposter.component';
import { ModalneweventComponent } from '../@theme/components/modals/modalsevents/modalnewevent/modalnewevent/modalnewevent.component';
import { CreacioneventosComponent } from './creacioneventos/creacioneventos.component';
import { HomeComponent } from './home/home.component';
import { InfoAcademicaPage } from './info-academica/info-academica.page';
import { InfoEmpresarialPage } from './info-empresarial/info-empresarial.page';
import { InfoLaboralPage } from './info-laboral/info-laboral.page';
import { InfoPersonalComponent } from './info-personal/info-personal.component';
import { InfoStudentsPage } from './info-students/info-students.page';
import { InscripcionaeventosComponent } from './inscripcionaeventos/inscripcionaeventos.component';
import { LocalizacionPage } from './localizacion/localizacion.page';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

declare var $: any;

const pagesComponents = [
  PagesComponent,
  LoginComponent,
  CreacioneventosComponent,
  HomeComponent,
  InfoAcademicaPage,
  InfoEmpresarialPage,
  InfoStudentsPage,
  InfoLaboralPage,
  InfoPersonalComponent,
  InscripcionaeventosComponent,
  LocalizacionPage,
];

@NgModule({
  declarations: [
    ...pagesComponents,
    SimpleComponent,
    ModalbasicinfoComponent,
    ModalbirthdayComponent,
    ModalposterComponent,
    HeaderComponent,
    ModalneweventComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    Ng2SmartTableModule,
    IonicModule,
    IonicSelectableModule,
    NgxChartsModule
    // BrowserAnimationsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
