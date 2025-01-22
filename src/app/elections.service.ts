import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { skipUrlModification } from './commons/interceptor/skip-loading';

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  http = inject(HttpClient);

  fetchElectionsData() {
    return this.http.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/ford?format=json', {
          context: new HttpContext().set(skipUrlModification, true)
        });
  }


}
