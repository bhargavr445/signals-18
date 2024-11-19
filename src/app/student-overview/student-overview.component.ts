import { Component, inject, ResourceRef, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { VehicleService } from '../commons/services/api/vehicle.service';
import { VehiclesResponseI } from '../Vehicle/Models/VehiclesI';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-student-overview',
  standalone: true,
  imports: [TableComponent],
  template: `
    @defer (when isLoading()) {
      <app-table [tableData]="response.value()?.Results" (dropDownSelection)=dropDownSelection($event)/>
    } @loading {
      <div>Loading...</div>
    }
  `
})

export class StudentOverviewComponent {

  vehicleType = signal('');
  isLoading = signal<boolean>(false);
  #vehicleService = inject(VehicleService);


  response: ResourceRef<VehiclesResponseI> = rxResource({
    request: () => this.vehicleType(),
    loader: ({ request }) => {
      this.isLoading.set(true)
      return this.#vehicleService.getVehicleData(request).pipe(tap({
        next: () => this.isLoading.set(false),
        error: () => this.isLoading.set(false)
      }
      ))
    }
  })


  // vehResp = rxResource({
  //   request: () => this.vehicleType(),
  //   loader: () => this.#vehicleService.getVehicleData() 
  // })

  // constructor() {
  //   this.vehResp.value()
  //   this.vehResp.error
  // }

  // .status(

  //   (res) => {
  //     this.response.set(res);
  //   }
  // )

  dropDownSelection(event) {
    console.log('kjgjhkgkjg');

    this.vehicleType.set(event)
  }

}

