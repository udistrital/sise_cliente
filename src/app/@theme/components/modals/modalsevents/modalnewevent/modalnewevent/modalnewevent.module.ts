import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalneweventRoutingModule } from './modalnewevent-routing.module';
import { InfoPersonalService } from '../../../../../../@core/services/infopersonal.service';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    NgSelectModule,
    IonicSelectableModule,
    CommonModule,
    ModalneweventRoutingModule,
  ],
  providers: [InfoPersonalService]
})

export class ModalneweventModule { }
