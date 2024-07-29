import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  http = inject(HttpClient);

  getGamesData(): Observable<any> {
    return this.http.get('http://localhost:3010/api/games').pipe(delay(2000))
  }

}
