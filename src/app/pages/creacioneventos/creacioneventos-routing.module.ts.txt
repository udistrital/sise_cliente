import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreacioneventosComponent } from './creacioneventos.component';

const routes: Routes = [
  {
    path: '',
    component: CreacioneventosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreacioneventosPageRoutingModule {}
