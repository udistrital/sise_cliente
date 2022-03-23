import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacioneventosPageRoutingModule } from './creacioneventos-routing.module';

import { CreacioneventosComponent } from './creacioneventos.component';
import { HttpClientModule } from '@angular/common/http';
import { CreacioneventosService } from '../../@core/services/creacioneventos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacioneventosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [CreacioneventosComponent],
  providers: [CreacioneventosService]
})
export class CreacioneventosPageModule {}
