import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreacioneventosPageRoutingModule } from './creacioneventos-routing.module';
import { CreacioneventosComponent } from './creacioneventos.component';
import { HttpClientModule } from '@angular/common/http';
import { CreacioneventosService } from '../../@core/services/creacioneventos.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacioneventosPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [CreacioneventosComponent],
  providers: [CreacioneventosService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CreacioneventosPageModule { }
