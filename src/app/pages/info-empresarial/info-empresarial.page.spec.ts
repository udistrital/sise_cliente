import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoEmpresarialPage } from './info-empresarial.page';

describe('InfoEmpresarialPage', () => {
  let component: InfoEmpresarialPage;
  let fixture: ComponentFixture<InfoEmpresarialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEmpresarialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoEmpresarialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
