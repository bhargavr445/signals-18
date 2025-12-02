import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GameService {

  #http = inject(HttpClient);

  getGamesData(): Observable<any> {
    return this.#http.get('games');
  }

  gamesResource: HttpResourceRef<{ data: any, status: number }> = httpResource<{ data: any, status: number }>(
    () => ({ url: 'games' }),
    {
      defaultValue: { data: [], status: 1 },
      parse: (value: { data: [], status: 1 }) => value
    }
  );

  gamesList = computed(() => this.gamesResource.value()?.data);
  gamesListError = computed(() => this.gamesResource.error());
  gamesListLoadingIndicator = computed(() => this.gamesResource.isLoading());
  // progress = computed(() => this.gamesResource.progress());

  fte() {
    // this.gamesResource.d
  }

  returnPromiseData(isSuccess: boolean) {
    return new Promise((resolve, reject) => {
      if (isSuccess) {
        resolve('This is success')
      } else {
        reject(new Error('Error from promise'))
      }
    })
  }

}
