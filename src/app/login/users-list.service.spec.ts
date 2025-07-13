import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { UsersListService } from './users-list.service';

fdescribe('UsersListService', () => {
  let service: UsersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],

    });
    service = TestBed.inject(UsersListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
