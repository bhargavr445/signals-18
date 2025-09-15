import { TestBed } from '@angular/core/testing';
import { Buy } from './buy';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';


fdescribe('Buy', () => {
  let service:Buy ;
  let httpTesting: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Buy,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Buy);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    // const req = httpTesting.expectOne('unEnrolledCourses');
    // req.flush(DEFAULT_CONFIG);
    expect(service).toBeTruthy();
    // expect(req.request.method).toBe('GET');
  });
});
