import { TestBed } from '@angular/core/testing';

import { Superadmin.GuardGuard } from './superadmin.guard.guard';

describe('Superadmin.GuardGuard', () => {
  let guard: Superadmin.GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Superadmin.GuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
