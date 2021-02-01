import { TestBed } from '@angular/core/testing';

import { SinglePlayerService } from './single-player.service';

describe('SinglePlayerService', () => {
  let service: SinglePlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglePlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
