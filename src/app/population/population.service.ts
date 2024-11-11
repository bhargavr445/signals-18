import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { skipUrlModification } from '../commons/interceptor/skip-loading';
import { PopulationResponseI } from './interfaces/population-responseI';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

  httpClient = inject(HttpClient)

  getPopulation(country: string): Observable<PopulationResponseI> {
    return this.httpClient.get<PopulationResponseI>('https://datausa.io/api/data?drilldowns=Nation&measures=Population',{
      context: new HttpContext().set(skipUrlModification, true)
    });
  }

}
