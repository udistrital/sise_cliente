import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoEmpresarialPage } from './info-empresarial.page';

const routes: Routes = [
  {
    path: '',
    component: InfoEmpresarialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoEmpresarialPageRoutingModule {}
