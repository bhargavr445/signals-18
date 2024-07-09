import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject, signal } from '@angular/core';
import { VehiclesResponseI } from '../../Models/VehiclesI';
import { FormsModule } from '@angular/forms';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component';
import { VehicleService } from '../../Services/vehicle.service';
import { FilterComponent } from '../../../commons/components/filter/filter.component';
import { JsonPipe } from '@angular/common';
import { endWith, forkJoin, interval, map, startWith, switchMap, withLatestFrom, zip } from 'rxjs';

@Component({
  selector: 'vehicle-overview',
  standalone: true,
  imports: [VehicleCardComponent, FormsModule, FilterComponent, JsonPipe],
  template: `
     
     <div class="pad-t-10">
       <app-filter  [(searchText)]="filterText"/>
     </div>

      @for (item of filteredRecords(); track $index) {
        <app-vehicle-card [vehicleInfo]="item"  (emitSome)="emitSome($event)"/>
      } @empty {
       <div>No Records Found...</div>
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
    // this.outer$
    // .pipe(
    //   // switchMap(() => this.inner$)
    //   withLatestFrom(this.inner$)
    // )
    // .subscribe(v => {
    //   console.log(new Date())
    //   console.log(v)
    // })

    // zip(this.outer$,this.inner$,  this.third$).subscribe(v => {
    //   console.log('********', new Date());
    //   console.log(v)
    // });

    forkJoin({
      inner: this.inner$,
      outer: this.outer$,
      third: this.third$
    }).subscribe(v => {
      console.log('********', new Date());
      console.log(v);  // This will log: { inner: 'destination', outer: 'source', third: 'third' }
    }, e => console.log(e));


  }

  filterRecords(text: string) {
    return this.response().Results.filter((vehiclle) => Object.keys(vehiclle).some((prop) => this.checkFormatchingString(vehiclle[prop], text)));
  }

  checkFormatchingString(data: string, text: string): boolean {
    return data?.toString()?.toLocaleLowerCase()?.includes(text)
  }

  loader(indicator: boolean) {
    console.log(indicator);
    this.isDataLoading = indicator;
  }

  fetchData() {
    this.vehicleService.getVehicleData()
      // .pipe(
      //   startWith(this.loader(true)), 
      //   endWith('vjvjv')
      // )
      .subscribe({
        next: (resp: VehiclesResponseI) => this.handleSuccess(resp),
        error: (err) => this.handleError(err)
      });
  }

  handleSuccess(resp: VehiclesResponseI) {
    console.log(resp);
    
    this.response.set(resp);
  }

  handleError(error) {
    console.log(error);
  }

  emitSome(event: string) {
    console.log(event);
  }

}
