import { TestBed } from '@angular/core/testing';

import { SelectableService } from './selectable.service';

describe('SelectableService', () => {
  let service: SelectableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
