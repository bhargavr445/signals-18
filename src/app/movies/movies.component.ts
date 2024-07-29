import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, signal } from '@angular/core';
import { WeeksComponent } from '../commons/components/weeks/weeks.component';
import { MoviesService } from '../movies.service';
import { MoviesAPIResponseI, MoviesI } from '../university/interfaces/UniversityListI';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [WeeksComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoviesComponent {

  moviesResponse =  signal<MoviesAPIResponseI>(null);
  paginatedMovieResults =  signal<MoviesI[]>([]);

  moviesService = inject(MoviesService);

  constructor() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.moviesService.fetchMoviesFromApi().subscribe(
      (resp) => { 
        this.moviesResponse.set(resp);
       },
      () => { }
    );
  }

  handlePaginatedList(event) {
    console.log(event.detail);
    this.paginatedMovieResults.set(event.detail);
    
  }

}
