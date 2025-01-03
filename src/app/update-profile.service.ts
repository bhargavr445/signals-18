import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  #http = inject(HttpClient);

  fetchData() {
    return this.#http.get('categories');
  }
}
