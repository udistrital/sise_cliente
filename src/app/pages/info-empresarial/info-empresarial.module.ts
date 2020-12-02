import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoEmpresarialPageRoutingModule } from './info-empresarial-routing.module';

import { InfoEmpresarialPage } from './info-empresarial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoEmpresarialPageRoutingModule
  ],
  declarations: [InfoEmpresarialPage]
})
export class InfoEmpresarialPageModule {}
