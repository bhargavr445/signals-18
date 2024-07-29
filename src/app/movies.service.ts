import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MoviesAPIResponseI } from './university/interfaces/UniversityListI';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  http = inject(HttpClient);
  
  fetchMoviesFromApi(): Observable<MoviesAPIResponseI> {
    return this.http.get<MoviesAPIResponseI>('http://localhost:3010/api/movies').pipe(delay(2000));
  }
}
