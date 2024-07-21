import { TestBed } from '@angular/core/testing';

import { SelectedSingleServiceService } from './selected-single-service.service';

describe('SelectedSingleServiceService', () => {
  let service: SelectedSingleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedSingleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
