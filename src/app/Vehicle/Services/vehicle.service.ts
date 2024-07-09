import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { VehiclesResponseI } from '../Models/VehiclesI';
import { Observable, filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicleData(): Observable<VehiclesResponseI> {
    return this.http.get<VehiclesResponseI>('https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json').pipe(
      filter(resp => !!resp),
      map(resp => this.#addNewPropInResult(resp))
    );
  }

  #addNewPropInResult(resp: VehiclesResponseI) {
    const updatedResp = resp.Results.map((result) => ({...result, customId : `${result.MakeId}${result.VehicleTypeId}`}))
    return {...resp, Results: updatedResp}
  }


}
