import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionaeventosComponent } from './inscripcionaeventos.component';

const routes: Routes = [
  {
    path: '',
    component: InscripcionaeventosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionaeventosPageRoutingModule {}
