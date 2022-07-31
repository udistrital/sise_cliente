import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoAcademicaPageRoutingModule } from './info-academica-routing.module';

import { InfoAcademicaPage } from './info-academica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoAcademicaPageRoutingModule
  ],
  declarations: [InfoAcademicaPage]
})
export class InfoAcademicaPageModule {}
