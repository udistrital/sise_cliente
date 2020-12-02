import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoLaboralPage } from './info-laboral.page';

describe('InfoLaboralPage', () => {
  let component: InfoLaboralPage;
  let fixture: ComponentFixture<InfoLaboralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoLaboralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoLaboralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
