import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoAcademicaPage } from './info-academica.page';

describe('InfoAcademicaPage', () => {
  let component: InfoAcademicaPage;
  let fixture: ComponentFixture<InfoAcademicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAcademicaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoAcademicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
