import { TestBed } from '@angular/core/testing';

import { InfopersonalService } from './infopersonal.service';

describe('InfopersonalService', () => {
  let service: InfopersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfopersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
