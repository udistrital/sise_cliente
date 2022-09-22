import { TestBed } from '@angular/core/testing';

import { InfoPersonalService } from './infopersonal.service';

describe('InfoPersonalService', () => {
  let service: InfoPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
