import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreacioneventosComponent } from './creacioneventos/creacioneventos.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SimpleComponent } from '../@theme/components/enlargeImg/simple/simple/simple.component';
import { ModalbasicinfoComponent } from '../@theme/components/modals/modalbasicinfo/modalbasicinfo.component';
import { ModalposterComponent } from '../@theme/components/modals/modalposter/modalposter/modalposter.component';
import { ModalbirthdayComponent } from '../@theme/components/modals/modalbirthday/modalbirthday.component';
import { __await } from 'tslib';
import { HomeComponent } from './home/home.component';
import { InfoAcademicaPage } from './info-academica/info-academica.page';
import { InfoEmpresarialPage } from './info-empresarial/info-empresarial.page';
import { InfoLaboralPage } from './info-laboral/info-laboral.page';
import { InfoPersonalComponent } from './info-personal/info-personal.component';
import { InscripcionaeventosComponent } from './inscripcionaeventos/inscripcionaeventos.component';
import { HeaderComponent } from '../@theme/components/header/header.component';
import { ModalneweventComponent } from '../@theme/components/modals/modalsevents/modalnewevent/modalnewevent/modalnewevent.component';
import { LocalizacionPage } from './localizacion/localizacion.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { LoginComponent } from './login/login.component'
import { InfoStudentsPage } from './info-students/info-students.page';

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
    IonicSelectableModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
