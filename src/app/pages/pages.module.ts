import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreacioneventosComponent } from './creacioneventos/creacioneventos.component';
import { CreacioneventosService } from '../@core/services/creacioneventos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SimpleComponent } from '../@theme/components/enlargeImg/simple/simple/simple.component';
import { ImplicitAutenticationService } from '../@core/utils/implicit_autentication.service';
import { PhotoService } from '../@core/services/photo.service';
import { ModalController } from '@ionic/angular';
import { ModalbasicinfoComponent } from '../@theme/components/modals/modalbasicinfo/modalbasicinfo.component';
import { ModalposterComponent } from '../@theme/components/modals/modalposter/modalposter/modalposter.component';
import { HomeService } from '../@core/services/home.service';
import { DatosIdentificacionTercero } from '../@core/data/models/datos_identificacion_tercero';
import { ModalbirthdayComponent } from '../@theme/components/modals/modalbirthday/modalbirthday.component';
import { ModalService } from '../@core/services/notify/modal.service';
import { Documento } from '../@core/data/models/document';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../@core/services/notify/loader.service';
import { InfoAcademica } from '../@core/data/models/info_academica_tercero';
import { DataInfoTercero } from '../@core/data/models/data_info_tercero';
import { TerceroService } from '../@core/services/tercero/tercero.service';
import { NgForm } from '@angular/forms';
import { ToastService } from '../@core/services/notify/toast.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InfoEmpresarial } from '../@core/data/models/info_empresarial_tercero';
import { InfoLaboral } from '../@core/data/models/info_laboral_tercero';
import { TerceroHerlper } from './../@core/helpers/Tercero/terceroHelper';
import { __await } from 'tslib';
import { InfoComplementariaTercero } from '../@core/data/models/info_complementaria_tercero';
import { InfoPersonal } from '../@core/data/models/info_personal_tercero';
import { SelectableService } from '../@core/services/search/selectable.service';
import codigospaisesconcdn from '../../assets/paises/codigospaisesconcdn.json';
import { InfoPersonalService } from '../@core/services/infopersonal.service';
import { Routes } from '@angular/router';
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

declare var $: any;

const pagesComponents = [
  PagesComponent,
  CreacioneventosComponent,
  HomeComponent,
  InfoAcademicaPage,
  InfoEmpresarialPage,
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
