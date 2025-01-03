import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, map } from 'rxjs';
import { Filter } from '../../../commons/components/filter/filter';
import { VehicleService } from '../../../commons/services/api/vehicle.service';
import { VehiclesResponseI } from '../../Models/VehiclesI';
import { DeferComponent } from '../defer/defer.component';
import { VehicleCard } from '../vehicle-card/vehicle-card';

@Component({
    selector: 'vehicle-overview',
    imports: [VehicleCard, FormsModule, Filter],
    template: `
     <div class="main">
      @if(!vehicleApiFailed()) {
        <div class="pad-t-10">
       <app-filter  [(searchText)]="filterText"/>
     </div>
      @if( filteredRecords().length > 0) {
        @for (item of filteredRecords(); track $index) {
            <app-vehicle-card [vehicleInfo]="item"  (emitSome)="emitSome($event)"/>

          } @empty {
          <div>No Records Found...</div>
          }

          <!-- @defer (on viewport) {
            <app-defer />
          } @placeholder {
            <div>Something is loading...</div>
          } -->
      } @else {
        <div class="cards-container-vehicles">
        @for(d of [1,2,3,4,5,6]; track $index) {
         
            <div class="card">
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text" style="width: 60%;"></div>
                    <div class="skeleton skeleton-button"></div>
                </div>
                
          
                
                
                }
                </div>
      }
      } @else {
        <div>Down due to Technical issues.</div>
      }
     </div>
     
   `
})
export class VehicleOverview {

  isDataLoading = false;
  filterText = signal('');
  filteredRecords = computed(() => this.filterRecords(this.filterText()));
  #vehicleService = inject(VehicleService);
  response = signal<VehiclesResponseI>({ Count: null, Message: '', SearchCriteria: '', Results: [] });
  vehicleApiFailed = signal(false);

  outer$ = interval(5000).pipe(map(() => 'outer'));
  inner$ = interval(1000).pipe(map(() => 'inner'));
  third$ = interval(500).pipe(map(() => 'third'));

  constructor() {
    this.fetchData();
  }

  filterRecords(text: string) {
    return this.response().Results.filter((vehiclle) => Object.keys(vehiclle).some((prop) => this.checkFormatchingString(vehiclle[prop], text)));
  }

  checkFormatchingString(data: string, text: string): boolean {
    return data?.toString()?.toLocaleLowerCase()?.includes(text)
  }

  loader(indicator: boolean) {
    this.isDataLoading = indicator;
  }

  fetchData() {
    this.vehicleApiFailed.set(false);
    this.#vehicleService.getVehicleData('')
      .subscribe({
        next: (resp: VehiclesResponseI) => this.handleSuccess(resp),
        error: (err) => this.handleError(err)
      });
  }

  handleSuccess(resp: VehiclesResponseI) {    
    this.response.set(resp);
  }

  handleError(error) {
    this.vehicleApiFailed.set(true);
  }

  emitSome(event: string) {
    console.log(event);
  }

}
