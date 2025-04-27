import { ApplicationConfig, isDevMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appReducer } from './app-store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { AppEffects } from './app-store/app.effects';
import { universityReducer } from './university/store/university.reducer';
import { UniversityEffects } from './university/store/university.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './commons/interceptor/auth.interceptor';
import { spinnerInterceptor } from './commons/interceptor/spinner.interceptor';
import { electionsReducer } from './elections/store/elections-reducer';
import { ElectionEffects } from './elections/store/elections-effects';

const storeConfig = { app: appReducer, university: universityReducer, elections: electionsReducer }

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
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
