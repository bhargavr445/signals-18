import { Component, computed, inject, Signal, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from '../../../commons/components/filter/filter.component';
import { VehicleService } from '../../../commons/services/api/vehicle.service';
import { VehiclesResponseI } from '../../Models/VehiclesI';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component';
import { VehicleStore } from '../../signal-store/vehicle-store';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { DiscussionStore } from '../../signal-store/discussion-store';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  imports: [VehicleCardComponent, FormsModule, FilterComponent],
  providers: [VehicleStore],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
     <div class="main">
      <button (click)="updName()">Update name</button>
      {{nameFromStore()}}
      {{isApiInProgress()}}
      @if(!vehicleApiFailed()) {
        <div class="pad-t-10">
       <app-filter  [(searchText)]="filterText"/>
     </div>
      @if( filteredRecords().length > 0) {
        @for (item of filteredRecords(); track $index) {
            <VehicleCard [vehicleInfo]="item"  (emitSome)="emitSome($event)"/>

          } @empty {
          <div>No Records Found...</div>
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
      } @else {
        <div>Down due to Technical issues.</div>
      }
      <button (click)="updateState()">Update State</button>
     </div>
   `
})
export class VehicleOverviewComponent {

  #discussionStore = inject(DiscussionStore);
  nameFromStore = this.#discussionStore.nameC;
  listC = this.#discussionStore.listC;
  listC$ = this.#discussionStore.vehicleResponse$;
  apiList = this.#discussionStore.apisList;
  isApiInProgress = this.#discussionStore.isApiInProgress;

  vehicleStore = inject(VehicleStore);
  isDataLoading = false;
  filterText = signal('');
  debounceQuery = toSignal(toObservable(this.filterText).pipe(debounceTime(300)))
  response: Signal<VehiclesResponseI> = this.vehicleStore.vehiclesListC;
  filteredRecords = computed(() => this.filterRecords(this.debounceQuery(), this.response()));
  #vehicleService = inject(VehicleService);
  vehicleApiFailed = signal(false);

  constructor() {
    this.vehicleStore.loadVehicles();
  }

  updName() {
    this.#discussionStore.updateName('Bhargav R G');
    this.#discussionStore.getUnivList('tst');
    for(const url of this.apiList()){
      console.log('dfklgnfgn');
      console.log(url);
      
    }

  }

  updateState() {
    this.vehicleStore.updateCount();
  }

  filterRecords(text: string, records: VehiclesResponseI) {    
    return this.response()?.Results.filter((vehiclle) => Object.keys(vehiclle).some((prop) => this.checkFormatchingString(vehiclle[prop], text)));
  }

  checkFormatchingString(data: string, text: string): boolean {
    return data?.toString()?.toLocaleLowerCase()?.includes(text)
  }

  loader(indicator: boolean) {
    this.isDataLoading = indicator;
  }


  // fetchData() {
  //   this.vehicleApiFailed.set(false);
  //   this.#vehicleService.getVehicleData('')
  //     .subscribe({
  //       next: (resp: VehiclesResponseI) => this.handleSuccess(resp),
  //       error: (err) => this.handleError(err)
  //     });
  // }

  // handleSuccess(resp: VehiclesResponseI) {
  //   const vehiclesArray = resp.Results;
  //   for (let mainIndex = 0; mainIndex < vehiclesArray.length; mainIndex++) {
  //     for (let index = mainIndex + 1; index < vehiclesArray.length; index++) {
  //       const vehicleFormUnSortedList = vehiclesArray[mainIndex];
  //       const vehicleFromSubLoop = vehiclesArray[index];

  //       if (parseInt(vehicleFormUnSortedList.customId) < parseInt(vehicleFromSubLoop.customId)) {
  //         const temp = vehicleFormUnSortedList;
  //         vehiclesArray[mainIndex] = vehicleFromSubLoop;
  //         vehiclesArray[index] = temp;
  //       }
  //     }

  //   }
  //   console.log(vehiclesArray)
  //   //this.response.set(resp);
  // }

  handleError(error) {
    this.vehicleApiFailed.set(true);
  }

  emitSome(event: string) {
    // console.log(event);
  }

}
