import { TestBed } from '@angular/core/testing';

import { PassportApplyService } from './passport-apply.service';

describe('PassportApplyService', () => {
  let service: PassportApplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassportApplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
