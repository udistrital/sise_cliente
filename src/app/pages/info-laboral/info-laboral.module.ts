import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoLaboralPageRoutingModule } from './info-laboral-routing.module';

import { InfoLaboralPage } from './info-laboral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoLaboralPageRoutingModule
  ],
  declarations: [InfoLaboralPage]
})
export class InfoLaboralPageModule {}
