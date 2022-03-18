import { TestBed } from '@angular/core/testing';

import { CreacioneventosService } from './creacioneventos.service';

describe('CreacioneventosService', () => {
  let service: CreacioneventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreacioneventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
