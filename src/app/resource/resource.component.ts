import { Component, computed, effect, inject, signal } from '@angular/core';
import { ResourceService } from '../resource.service';
import { VehicleCardComponent } from "../Vehicle/Components/vehicle-card/vehicle-card.component";
import { HttpResourceFn, HttpResourceRef } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-resource',
  imports: [VehicleCardComponent, JsonPipe],
  templateUrl: './resource.component.html'
})
export class ResourceComponent {

  items = signal(['ford', 'merc', 'lexus'])
  selectedVehicle = signal('ford');

  resourceService = inject(ResourceService);
  // vehiclesList = this.resourceService.response;
  response: HttpResourceRef<any> = this.resourceService.fetchData(this.selectedVehicle);

  errorResponse = computed(() => this.response.error());
  vehiclesList = computed(() => this.response.value());



  onOptionChange(event) {
    console.log(event.target.value);
    this.selectedVehicle.set(event.target.value);
    // this reload will re-trigger httpResource, but it will load with the previous input source.
    // this.response.reload();
  }

}
