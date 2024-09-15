import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, filter, throwError } from 'rxjs';
import { MoviesAPIResponseI } from '../../../university/interfaces/UniversityListI';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  http = inject(HttpClient);

  fetchMoviesFromApi(): Observable<MoviesAPIResponseI> {
    return this.http.get<MoviesAPIResponseI>('movies').pipe(
      filter(resp => !!resp),
      catchError((error) => throwError(() => {
        return { ...error, msg: 'Handled Error in service************' }
      }))
    );
  }

}
