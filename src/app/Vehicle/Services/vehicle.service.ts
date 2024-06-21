import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehiclesResponseI } from '../Models/VehiclesI';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicleData(): Observable<VehiclesResponseI> {
    return this.http.get<VehiclesResponseI>('https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json').pipe(
      map(resp => this.addNewPropInResult(resp))
    );
  }

  addNewPropInResult(resp: VehiclesResponseI) {
    const updatedResp = resp.Results.map((result) => ({...result, customId : `${result.MakeId}${result.VehicleTypeId}`}))
    return {...resp, Results: updatedResp}
  }


}
