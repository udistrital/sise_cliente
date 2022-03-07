import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalbasicinfoComponent } from './modalbasicinfo/modalbasicinfo.component';
import { FormsModule } from '@angular/forms';
import { HomePage } from '../../pages/home/home.page';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalbasicinfoComponent,
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    ModalbasicinfoComponent,
  ],
  entryComponents: [
    ModalbasicinfoComponent,
  ],   
  providers: [
    HomePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule { }
