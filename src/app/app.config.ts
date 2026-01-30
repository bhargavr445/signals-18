import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
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
import { provideSignalFormsConfig,  } from '@angular/forms/signals';

const storeConfig = { app: appReducer, university: universityReducer, elections: electionsReducer }

const NG_STATUS_CLASSES: any['classes'] = {
  'ng-touched': (state) => state.touched(),
  'ng-untouched': (state) => !state.touched(),
  'ng-dirty': (state) => state.dirty(),
  'ng-pristine': (state) => !state.dirty(),
  'ng-valid': (state) => state.valid(),
  'ng-invalid': (state) => state.invalid(),
  'ng-pending': (state) => state.pending(),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    // provideSignalFormsConfig({ classes: NG_STATUS_CLASSES }),

    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, spinnerInterceptor])
    ),
    provideStore(storeConfig),
    provideEffects([AppEffects, UniversityEffects, ElectionEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ],
};
