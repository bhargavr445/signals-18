import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversityListI } from '../interfaces/UniversityListI';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  HttpClient = inject(HttpClient);

  getUniversities(country: string): Observable<UniversityListI[]> {
    return this.HttpClient.get<UniversityListI[]>(`http://universities.hipolabs.com/search?country=${country}`);
  }


}
