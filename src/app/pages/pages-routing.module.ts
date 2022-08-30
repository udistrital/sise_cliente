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
import { LoginComponent } from './login/login.component'
import { AuthGuard } from '../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard],
      data: {
        roles: [
          'Internal/selfsignup',
          'Internal/everyone',
        ],
      },
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'creacioneventos',
      component: CreacioneventosComponent,
      canActivate: [AuthGuard],
      data: {
        roles: [
          'Internal/selfsignup',
          'Internal/everyone',
        ],
      },
    },
    {
      path: 'info-academica',
      component: InfoAcademicaPage,
      canActivate: [AuthGuard],
      data: {
        roles: [


          'Internal/selfsignup',
          'Internal/everyone',
        ],
      },
    },
    {
      path: 'info-empresarial',
      component: InfoEmpresarialPage,
      canActivate: [AuthGuard],
      data: {
        roles: [


          'Internal/selfsignup',
          'Internal/everyone',
        ],
      },
    },
    {
      path: 'info-laboral',
      component: InfoLaboralPage,
      canActivate: [AuthGuard],
      data: {
        roles: [


          'Internal/selfsignup',
          'Internal/everyone',
        ],
      },
    },
    {
      path: 'info-personal',
      component: InfoPersonalComponent,
      canActivate: [AuthGuard],
      data: {
        roles: [
          'Internal/selfsignup',
          'Internal/everyone',
        ],
      },
    },
    {
      path: 'incripcionaeventos',
      component: InscripcionaeventosComponent,
      canActivate: [AuthGuard],
      data: {
        roles: [
          'Internal/selfsignup',
          'Internal/everyone',
        ],
      },
    },
    {
      path: 'localizacion',
      component: LocalizacionPage,
      canActivate: [AuthGuard],
      data: {
        roles: [


          'Internal/selfsignup',
          'Internal/everyone',
        ],
      },
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
