import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppEffects } from './app-store/app.effects';
import { appReducer } from './app-store/app.reducer';
import { routes } from './app.routes';
import { authInterceptor } from './commons/interceptor/auth.interceptor';
import { spinnerInterceptor } from './commons/interceptor/spinner.interceptor';
import { ElectionEffects } from './elections/store/elections-effects';
import { electionsReducer } from './elections/store/elections-reducer';
import { UniversityEffects } from './university/store/university.effects';
import { universityReducer } from './university/store/university.reducer';

const storeConfig = { app: appReducer, university: universityReducer, elections: electionsReducer }

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, spinnerInterceptor])),
    provideStore(storeConfig),
    provideEffects([AppEffects, UniversityEffects, ElectionEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ],
};
