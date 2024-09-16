import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, map } from 'rxjs';
import { FilterComponent } from '../../../commons/components/filter/filter.component';
import { VehicleService } from '../../../commons/services/api/vehicle.service';
import { VehiclesResponseI } from '../../Models/VehiclesI';
import { DeferComponent } from '../defer/defer.component';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component';

@Component({
  selector: 'vehicle-overview',
  standalone: true,
  imports: [VehicleCardComponent, FormsModule, FilterComponent, JsonPipe, DeferComponent],
  template: `
     <div class="main">
     <div class="pad-t-10">
       <app-filter  [(searchText)]="filterText"/>
     </div>
      @if( filteredRecords().length > 0) {
        @for (item of filteredRecords(); track $index) {
            <app-vehicle-card [vehicleInfo]="item"  (emitSome)="emitSome($event)"/>

          } @empty {
          <div>No Records Found...</div>
          }

          @defer(when filteredRecords().length > 0) {
            <app-defer />
          } @placeholder {
            <div>Place Holder</div>
          }
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
     </div>
     
   `
})
export class VehicleOverviewComponent {

  isDataLoading = false;
  filterText = signal('');
  filteredRecords = computed(() => this.filterRecords(this.filterText()));
  vehicleService = inject(VehicleService);
  response = signal<VehiclesResponseI>({ Count: null, Message: '', SearchCriteria: '', Results: [] });

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
    this.vehicleService.getVehicleData('')
      .subscribe({
        next: (resp: VehiclesResponseI) => this.handleSuccess(resp),
        error: (err) => this.handleError(err)
      });
  }

  handleSuccess(resp: VehiclesResponseI) {    
    this.response.set(resp);
  }

  handleError(error) {
  }

  emitSome(event: string) {
    console.log(event);
  }

}
