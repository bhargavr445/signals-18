import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehiclesResponseI } from '../../../Vehicle/Models/VehiclesI';
import { Observable, delay, filter, map, tap } from 'rxjs';
import { skipUrlModification } from '../../interceptor/skip-loading';

function _tap<T>() {
  return (source$: Observable<T>) => source$.pipe(tap(v => console.log(v)))
}

function _filter<T>() {
  return (source$: Observable<T>) => source$.pipe(filter(v => !!v));
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicleData(vehicleType?: string): Observable<VehiclesResponseI> {

    return this.http.get<VehiclesResponseI>(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${vehicleType ? vehicleType : 'ford'}?format=json`, {
      context: new HttpContext().set(skipUrlModification, true)
    })
      .pipe(
       _tap<VehiclesResponseI>(),
       _filter<VehiclesResponseI>(),
        map(resp => this.#addNewPropInResult(resp)),
      );
  }

  #addNewPropInResult(resp: VehiclesResponseI) {
    const updatedResp = resp.Results.map((result) => ({ ...result, customId: `${result.MakeId}${result.VehicleTypeId}` }))
    return { ...resp, Results: updatedResp }
  }

  add(v1, v2) {
    return v1 + v2
  }

  add1 = (v1, v2) => {
    return v1 + v2
  }

  add2 = v1 => v1 + 9;

}



