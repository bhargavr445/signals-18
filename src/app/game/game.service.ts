import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  http = inject(HttpClient);

  getGamesData(): Observable<any> {
    return this.http.get('http://localhost:3010/api/games');
  }

}
