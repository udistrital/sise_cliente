import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreacioneventosPageRoutingModule } from './creacioneventos-routing.module';
import { CreacioneventosComponent } from './creacioneventos.component';
import { HttpClientModule } from '@angular/common/http';
import { CreacioneventosService } from '../../@core/services/creacioneventos.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SimpleComponent } from '../../@theme/components/enlargeImg/simple/simple/simple.component';

@NgModule({
  declarations: [CreacioneventosComponent, SimpleComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacioneventosPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
  ],
  providers: [CreacioneventosService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CreacioneventosPageModule { }
