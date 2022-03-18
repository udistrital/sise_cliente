import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalbasicinfoComponent } from './modals/modalbasicinfo/modalbasicinfo.component';
import { FormsModule } from '@angular/forms';
import { HomePage } from '../../pages/home/home.page';
import { ModalbirthdayComponent } from './modals/modalbirthday/modalbirthday.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalbasicinfoComponent,
    ModalbirthdayComponent,
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    ModalbasicinfoComponent,
    ModalbirthdayComponent,
  ],
  entryComponents: [
    ModalbasicinfoComponent,
    ModalbirthdayComponent,
  ],
  providers: [
    HomePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule { }
