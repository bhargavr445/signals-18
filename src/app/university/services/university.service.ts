import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CountrysApiResponseI, CountrysI, UniversitiesApiResponseI } from '../interfaces/UniversityListI';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  #http = inject(HttpClient);

  getUniversities(country: string): Observable<UniversitiesApiResponseI> {
    return this.#http.get<UniversitiesApiResponseI>(`universities/${country}`);
  }

  getCountrys(): Observable<CountrysApiResponseI> {
    return this.#http.get<CountrysApiResponseI>('countrys')
    // .pipe(
    //   map((data) => this.countrysData(data))
    // );
  }

  countrysData(data: CountrysApiResponseI): string[] {
   return  data.data.map((countryObj: CountrysI) => countryObj.name );

  }


}


