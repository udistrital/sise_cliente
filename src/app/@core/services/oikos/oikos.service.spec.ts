import { TestBed } from '@angular/core/testing';

import { OikosService } from './oikos.service';

describe('OikosService', () => {
  let service: OikosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OikosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
