import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleService } from '../commons/services/api/vehicle.service';
import { VehiclesResponseI } from '../Vehicle/Models/VehiclesI';

@Component({
  selector: 'app-student-overview',
  // imports: [TableComponent],
  template: `
  <!-- {{response.isLoading()}} -->
    <!-- @defer (when response.isLoading()) {
      <app-table [tableData]="response.value()?.Results" (dropDownSelection)=dropDownSelection($event)/>
    } @loading {
      <div>Loading...</div>
    } -->
  `
})

export class StudentOverviewComponent {

  #vehicleService = inject(VehicleService);

  vehicleType = signal('');

  // response: ResourceRef<VehiclesResponseI> = rxResource<VehiclesResponseI, { vehicleType: string }>({
  //   params: () => ({ vehicleType: this.vehicleType() }),
  //   fetch: (request) => this.fetchData(request.request.vehicleType)

  // });



  constructor() {
    //this.response.isLoading();
    // this.response.update((prevValue) => ({...prevValue}))
  }

  fetchData(vehicleType: string): Observable<VehiclesResponseI> {
    return this.#vehicleService.getVehicleData(vehicleType)
  }

  dropDownSelection(event: string) {    
    this.vehicleType.set(event);
  }

}
