import { Component, inject, signal } from '@angular/core';
import { TableComponent } from './table/table.component';
import { VehicleService } from '../Vehicle/Services/vehicle.service';
import { VehiclesResponseI } from '../Vehicle/Models/VehiclesI';
import { delay, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-student-overview',
  standalone: true,
  imports: [TableComponent],
  template: `
    @defer (when isLoading()) {
      <app-table [tableData]="response().Results" (dropDownSelection)=dropDownSelection($event)/>
    } @loading {
      <div>Loading...</div>
    }
  `,
  styleUrl: './student-overview.component.scss'
})
export class StudentOverviewComponent {

  isLoading = signal<boolean>(false);
  response = signal<VehiclesResponseI>({ Count: null, Message: '', SearchCriteria: '', Results: [] });
  vehicleService = inject(VehicleService);

  constructor() {
    this.isLoading.set(true);
    this.#getVehiclesData('ford');
  }

  #getVehiclesData(vehicleType: string) {
    this.vehicleService.getVehicleData(vehicleType)
      .subscribe({
        next: (resp: VehiclesResponseI) => this.handleSuccess(resp),
        error: (err) => this.handleError(err)
      });
  }

  handleSuccess(resp: VehiclesResponseI) {
    this.response.set(resp);
    this.isLoading.set(false);

  }

  handleError(error) {
    console.log(error);
    this.isLoading.set(false);
  }

  dropDownSelection(event) {
    this.#getVehiclesData(event);
  }

}

