import { Component, inject, signal } from '@angular/core';
import { VehiclesResponseI } from '../../Models/VehiclesI';
import { FormsModule } from '@angular/forms';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component';
import { VehicleService } from '../../Services/vehicle.service';

@Component({
  selector: 'ang-18-comp',
  standalone: true,
  imports: [VehicleCardComponent, FormsModule],
  template: `
      @for (item of response()?.Results; track $index) {
        <app-vehicle-card [vehicleInfo]="item"  (emitSome)="emitSome($event)"/>
    }
   `
})
export class Ang18Component {

  vehicleService = inject(VehicleService);
  response = signal<VehiclesResponseI>({ Count: null, Message: '', SearchCriteria: '', Results: [] });

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.vehicleService.getVehicleData().subscribe({
      next: (resp: VehiclesResponseI) => this.handleSuccess(resp),
      error: (err) => this.handleError(err)
    });
  }

  handleSuccess(resp: VehiclesResponseI) {
    this.response.set(resp);
  }

  handleError(error) {
    console.log(error);
  }

  emitSome(event: string) {
    console.log(event);
    
  }

}
