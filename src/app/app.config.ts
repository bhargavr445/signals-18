import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
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

const storeConfig = { app: appReducer, university: universityReducer }

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(storeConfig),
    provideEffects([AppEffects, UniversityEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ],
};
