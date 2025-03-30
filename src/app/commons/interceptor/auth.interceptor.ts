import { HttpInterceptorFn } from '@angular/common/http';
import { skipUrlModification } from './skip-loading';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const urlPrefix = "https://backend-api-node.onrender.com/api/";

  const authHeader = `Bearer ${sessionStorage.getItem('TOKEN')}`;
  console.log(req.context.has(skipUrlModification));
  

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
