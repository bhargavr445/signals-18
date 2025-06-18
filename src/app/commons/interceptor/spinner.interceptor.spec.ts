import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { spinnerInterceptor } from './spinner.interceptor';

describe('spinnerInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => spinnerInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],

    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
