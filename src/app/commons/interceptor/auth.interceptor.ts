import { HttpInterceptorFn } from '@angular/common/http';
import { skipUrlModification } from './skip-loading';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const urlPrefix = environment.apiUrl;

  const authHeader = `Bearer ${sessionStorage.getItem('TOKEN')}`;
  console.log(req.url);
  // console.log('**********^^^^&&&&&&&&&&&&&',req);
  

  return next(
    req.context.has(skipUrlModification) ?
      req :
      req.clone({
        setHeaders: { Authorization: authHeader },
        url: `${urlPrefix}${req.url}`
      })
  );
};
// setHeaders: { Authorization: authHeader, anotherKey: value } we can pass diff headers like these 
