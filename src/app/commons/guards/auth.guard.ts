import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { spinnerInterceptor } from '../interceptor/spinner.interceptor';

export const authGuard: CanActivateFn = (route, state) => {

  let sp = inject(spinnerInterceptor);
 const  checkIfSpinnerIsActive = () => {
  
  }
  return true;
};


