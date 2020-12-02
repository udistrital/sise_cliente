import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoPersonalPage } from './info-personal.page';

describe('InfoPersonalPage', () => {
  let component: InfoPersonalPage;
  let fixture: ComponentFixture<InfoPersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPersonalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
