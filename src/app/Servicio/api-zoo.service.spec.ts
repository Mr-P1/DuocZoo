import { TestBed } from '@angular/core/testing';

import { ApiZooService } from './api-zoo.service';

describe('ApiZooService', () => {
  let service: ApiZooService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiZooService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
