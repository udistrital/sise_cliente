import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'info-personal',
    loadChildren: () => import('./pages/info-personal/info-personal.module').then( m => m.InfoPersonalPageModule)
  },
  {
    path: 'info-academica',
    loadChildren: () => import('./pages/info-academica/info-academica.module').then( m => m.InfoAcademicaPageModule)
  },
  {
    path: 'info-laboral',
    loadChildren: () => import('./pages/info-laboral/info-laboral.module').then( m => m.InfoLaboralPageModule)
  },
  {
    path: 'info-empresarial',
    loadChildren: () => import('./pages/info-empresarial/info-empresarial.module').then( m => m.InfoEmpresarialPageModule)
  },
  {
    path: 'localizacion',
    loadChildren: () => import('./pages/localizacion/localizacion.module').then( m => m.LocalizacionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
