import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject, signal } from '@angular/core';
import { VehiclesResponseI } from '../../Models/VehiclesI';
import { FormsModule } from '@angular/forms';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component';
import { VehicleService } from '../../Services/vehicle.service';
import { FilterComponent } from '../../../commons/components/filter/filter.component';
import { JsonPipe } from '@angular/common';
import { endWith, forkJoin, interval, map, startWith, switchMap, withLatestFrom, zip } from 'rxjs';
import { DeferComponent } from '../defer/defer.component';

@Component({
  selector: 'vehicle-overview',
  standalone: true,
  imports: [VehicleCardComponent, FormsModule, FilterComponent, JsonPipe, DeferComponent],
  template: `
     
     <div class="pad-t-10">
       <app-filter  [(searchText)]="filterText"/>
     </div>
      @if( filteredRecords().length > 0) {
        @for (item of filteredRecords(); track $index) {
            <app-vehicle-card [vehicleInfo]="item"  (emitSome)="emitSome($event)"/>

          } @empty {
          <div>No Records Found...</div>
          }

          @defer {
            <app-defer />
          } 
          
          <!-- @placeholder {
            <div>Place Holder</div>
          } -->
      }
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
