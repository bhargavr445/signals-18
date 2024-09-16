import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, signal } from '@angular/core';
import { WeeksComponent } from '../commons/components/weeks/weeks.component';
import { MoviesAPIResponseI, MoviesI } from '../university/interfaces/UniversityListI';
import { MoviesService } from '../commons/services/api/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [WeeksComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoviesComponent {

  // #region Signal API
  moviesResponse =  signal<MoviesAPIResponseI>(null);
  paginatedMovieResults =  signal<MoviesI[]>([]);
  isMoviesLoading = signal(false);
  //#endregion

  moviesService = inject(MoviesService);

  constructor() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.isMoviesLoading.set(true);
    this.moviesService.fetchMoviesFromApi().subscribe(
      (resp) => { 
        this.moviesResponse.set(resp);
        this.isMoviesLoading.set(false);

       },
      (error) => {
        console.log(error);
        this.isMoviesLoading.set(false);

       }
    );
  }

  handlePaginatedList(event) {
    this.paginatedMovieResults.set(event.detail);
    
  }

}
