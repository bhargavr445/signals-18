import { HttpResourceRef } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ResourceService } from '../resource.service';
import { VehicleCardComponent } from "../Vehicle/Components/vehicle-card/vehicle-card.component";
import { VehiclesResponseI } from '../Vehicle/Models/VehiclesI';
import { VehicleStore } from '../Vehicle/signal-store/vehicle-store';

@Component({
  selector: 'app-resource',
  imports: [VehicleCardComponent],
  providers: [VehicleStore],
  templateUrl: './resource.component.html'
})
export class ResourceComponent {

  items = signal(['ford', 'merc', 'lexus', 'tesla']);
  selectedVehicle = signal('ford');

  resourceService = inject(ResourceService);
  // vehiclesList = this.resourceService.response;
  response: HttpResourceRef<VehiclesResponseI>;

  errorResponse = computed(() => this.response?.error());
  vehiclesList = computed(() => this.response?.value());

  onOptionChange(event) {
    this.response = this.resourceService.fetchData123(this.selectedVehicle);
    console.log(event.target.value);
    this.selectedVehicle.set(event.target.value);
    // this reload will re-trigger httpResource, but it will load with the previous input source.
    // this.response.reload();
  }

}
