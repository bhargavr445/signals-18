import { HttpContext, httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { skipUrlModification } from './commons/interceptor/skip-loading';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {


  // vehicleType = signal<string>('');
  // private vehicleResponseResource = httpResource<any>(() => ({
  //   url: `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${this.vehicleType()}?format=json`,
  //   method: "GET",
  //   context: new HttpContext().set(skipUrlModification, true)
  // }));

  fetchData(formData: Signal<string>): HttpResourceRef<any> {    
    return httpResource<any>(() => ({
      url: formData() ?`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${formData()}?format=json` : undefined,
      // context: new HttpContext().set(skipUrlModification, true)
      configureRequest: (req) => req.clone({
        context: new HttpContext().set(skipUrlModification, true)
      })
    }));
  }



}
