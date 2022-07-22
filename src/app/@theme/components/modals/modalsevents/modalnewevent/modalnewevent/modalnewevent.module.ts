import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalneweventRoutingModule } from './modalnewevent-routing.module';
import { InfoPersonalService } from '../../../../../../@core/services/infopersonal.service';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    IonicSelectableModule,
    CommonModule,
    ModalneweventRoutingModule,
  ],
  providers: [InfoPersonalService]
})

export class ModalneweventModule { }
