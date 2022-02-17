import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPersonalPageRoutingModule } from './info-personal-routing.module';

import { InfoPersonalPage } from './info-personal.page';
import { HttpClientModule } from '@angular/common/http';
import { InfoPersonalService } from './info-personal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPersonalPageRoutingModule,
    HttpClientModule
  ],
  declarations: [InfoPersonalPage],
  providers: [InfoPersonalService]
})
export class InfoPersonalPageModule {}
