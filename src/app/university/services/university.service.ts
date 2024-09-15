import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CountrysApiResponseI, CountrysI, UniversitiesApiResponseI } from '../interfaces/UniversityListI';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  HttpClient = inject(HttpClient);

  getUniversities(country: string): Observable<UniversitiesApiResponseI> {
    return this.HttpClient.get<UniversitiesApiResponseI>(`universities/${country}`);
  }

  getCountrys(): Observable<CountrysApiResponseI> {
    return this.HttpClient.get<CountrysApiResponseI>('countrys')
    // .pipe(
    //   map((data) => this.countrysData(data))
    // );
  }

  countrysData(data: CountrysApiResponseI): string[] {
   return  data.data.map((countryObj: CountrysI) => countryObj.name );

  }


}


