import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { WeeksComponent } from '../commons/components/weeks/weeks.component';
import { MoviesI } from '../university/interfaces/UniversityListI';
import { moviesEvents, moviesStore } from './store/movies-store';

@Component({
  selector: 'app-movies',
  imports: [WeeksComponent],
  providers: [moviesStore],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoviesComponent {

  moviesEvents = injectDispatch(moviesEvents);
  moviesStore = inject(moviesStore);

  moviesResponse = this.moviesStore.moviesApiSuccessResponse;
  moviesErrorResponse = this.moviesStore.moviesApiErrorResponse;
  isMoviesLoading = this.moviesStore.moviesApiIsLoading;
  paginatedMovieResults = signal<MoviesI[]>([]);

  constructor() {
    this.moviesEvents.loadMovies();
  }

  handlePaginatedList(event) {
    this.paginatedMovieResults.set(event.detail);
  }

}
