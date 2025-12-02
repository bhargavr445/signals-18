import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ElectionsService } from './elections.service';
import { provideHttpClient } from '@angular/common/http';

describe('ElectionsService', () => {
  let service: ElectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    service = TestBed.inject(ElectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
