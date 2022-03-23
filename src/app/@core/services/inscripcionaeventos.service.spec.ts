import { TestBed } from '@angular/core/testing';

import { InscripcionaeventosService } from './inscripcionaeventos.service';

describe('InscripcionaeventosService', () => {
  let service: InscripcionaeventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionaeventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
