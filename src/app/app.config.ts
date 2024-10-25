import { ApplicationConfig, provideZoneChangeDetection, isDevMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
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
import { udemyReducer } from './udemy/store/udemy.reducer';
import { UdemyEffects } from './udemy/store/udemy.effects';
import { spinnerInterceptor } from './commons/interceptor/spinner.interceptor';

const storeConfig = { app: appReducer, university: universityReducer, udemy: udemyReducer }

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, spinnerInterceptor])),
    provideStore(storeConfig),
    provideEffects([AppEffects, UniversityEffects, UdemyEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ],
};
