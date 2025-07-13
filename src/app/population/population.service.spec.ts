import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PopulationService } from './population.service';
import { provideHttpClient } from '@angular/common/http';

fdescribe('PopulationService', () => {
  let service: PopulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],

    });
    service = TestBed.inject(PopulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
