import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalizacionPage } from './localizacion.page';

describe('LocalizacionPage', () => {
  let component: LocalizacionPage;
  let fixture: ComponentFixture<LocalizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
