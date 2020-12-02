import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoAcademicaPage } from './info-academica.page';

const routes: Routes = [
  {
    path: '',
    component: InfoAcademicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoAcademicaPageRoutingModule {}
