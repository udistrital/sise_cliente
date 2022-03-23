import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionaeventosPageRoutingModule } from './inscripcionaeventos-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { InscripcionaeventosComponent } from './inscripcionaeventos.component';
import { InscripcionaeventosService } from '../../@core/services/inscripcionaeventos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionaeventosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [InscripcionaeventosComponent],
  providers: [InscripcionaeventosService]
})
export class InscripcionaeventosPageModule {}
