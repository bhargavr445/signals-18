import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { skipUrlModification } from './skip-loading';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { DiscussionStore } from '../../Vehicle/signal-store/discussion-store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const discussionStore = inject(DiscussionStore);
  const urlPrefix = environment.apiUrl;
  let fullUrl = '';

  const authHeader = `Bearer ${sessionStorage.getItem('TOKEN')}`;
  if(!req.context.has(skipUrlModification)){
    fullUrl = `${urlPrefix}${req.url}`;
    console.log('^______^', fullUrl);
    discussionStore.showSpinner(fullUrl);
  }

  return next(
    req.context.has(skipUrlModification) ?
      req :
      req.clone({
        setHeaders: { Authorization: authHeader },
        url: fullUrl
      })
  ).pipe(
    tap({
      next: (resp) => {
        if(resp instanceof HttpResponse) {
          discussionStore.hideSpinner(resp['url'])
        }
      }, 
      error: () => {}
    })
  );
};
// setHeaders: { Authorization: authHeader, anotherKey: value } we can pass diff headers like these 
