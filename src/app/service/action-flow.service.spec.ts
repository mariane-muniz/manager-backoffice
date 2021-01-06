import { TestBed } from '@angular/core/testing';

import { ActionFlowService } from './action-flow.service';

describe('ActionFlowService', () => {
  let service: ActionFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
