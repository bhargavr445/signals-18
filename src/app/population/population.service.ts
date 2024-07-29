import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { Datum, PopulationResponseI } from './interfaces/population-responseI';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

 httpClient  = inject(HttpClient)

  getPopulation(country: string): Observable<PopulationResponseI> {
    console.log(country);
    return this.httpClient.get<PopulationResponseI>('https://datausa.io/api/data?drilldowns=Nation&measures=Population').pipe(
      delay(3000)
    );
  }


}
