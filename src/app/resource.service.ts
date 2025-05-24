import { HttpContext, httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { skipUrlModification } from './commons/interceptor/skip-loading';
import { VehiclesResponseI } from './Vehicle/Models/VehiclesI';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {


  // vehicleType = signal<string>('');

  //  vehicleResponseResource: HttpResourceRef<any> = httpResource<any>(() => ({
  //   url: this.vehicleType() ? `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${this.vehicleType()}?format=json`: undefined,
  //   method: "GET",
  //   context: new HttpContext().set(skipUrlModification, true)
  // }));

  // value = computed(() => this.vehicleResponseResource.value());
  // error = computed(() => this.vehicleResponseResource.isLoading());

  fetchData123(formData: Signal<string>): HttpResourceRef<VehiclesResponseI> {    
    return httpResource<VehiclesResponseI>(() => ({
      url: formData() ?`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${formData()}?format=json` : undefined,
      method: 'GET',
      context: new HttpContext().set(skipUrlModification, true)
    }), {
      parse: (value: VehiclesResponseI) => this.#addNewPropInResult(value) 
    });
  }

  #addNewPropInResult(resp: VehiclesResponseI) {
    const updatedResp = resp.Results.map((result) => ({ ...result, customId: `${result.MakeId}${result.VehicleTypeId}` }))
    return { ...resp, Results: updatedResp }
  }


}
// const skipUrlModification = new HttpContextToken(() => false);