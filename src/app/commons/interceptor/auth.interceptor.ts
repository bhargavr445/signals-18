import { HttpInterceptorFn } from '@angular/common/http';
import { skipUrlModification } from './skip-loading';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const urlPrefix = "http://localhost:3010/api/";

  var authHeader = `Bearer ${sessionStorage.getItem('TOKEN')}`;

  return next(
    req.context.has(skipUrlModification) ?
      req :
      req.clone({ setHeaders: { Authorization: authHeader }, url: `${urlPrefix}${req.url}` })
  );
};
// setHeaders: { Authorization: authHeader, anotherKey: value } we can pass diff headers like these 
