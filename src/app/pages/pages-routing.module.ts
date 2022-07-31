import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacioneventosComponent } from './creacioneventos/creacioneventos.component';
import { HomeComponent } from './home/home.component';
import { InfoPersonalComponent } from './info-personal/info-personal.component';
import { InfoAcademicaPage } from './info-academica/info-academica.page';
import { InfoEmpresarialPage } from './info-empresarial/info-empresarial.page';
import { InfoLaboralPage } from './info-laboral/info-laboral.page';
import { InscripcionaeventosComponent } from './inscripcionaeventos/inscripcionaeventos.component';
import { LocalizacionPage } from './localizacion/localizacion.page';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'creacioneventos',
      component: CreacioneventosComponent,
    },
    {
      path: 'info-academica',
      component: InfoAcademicaPage,
    },
    {
      path: 'info-empresarial',
      component: InfoEmpresarialPage,
    },
    {
      path: 'info-laboral',
      component: InfoLaboralPage,
    },
    {
      path: 'info-personal',
      component: InfoPersonalComponent,
    },
    {
      path: 'incripcionaeventos',
      component: InscripcionaeventosComponent,
    },
    {
      path: 'localizacion',
      component: LocalizacionPage,
    },
    {
      path: '', redirectTo: 'home', pathMatch: 'full',
    },
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
