import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appReducer } from './app-store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { AppEffects } from './app-store/app.effects';
import { universityReducer } from './university/store/university.reducer';
import { UniversityEffects } from './university/store/university.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideStore({ app: appReducer, university: universityReducer }),
    provideEffects([AppEffects, UniversityEffects])
  ],
};
