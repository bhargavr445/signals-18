import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
