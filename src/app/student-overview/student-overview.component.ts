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
      <app-table [tableData]="response().Results"/>
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

  outer$ = of('source').pipe(delay(1000));
  inner$ = of('destination').pipe(delay(5000));
  third$ = of('third').pipe(delay(500));

   
  


  constructor() {
    this.isLoading.set(true);
    this.vehicleService.getVehicleData()
      .subscribe({
        next: (resp: VehiclesResponseI) => this.handleSuccess(resp),
        error: (err) => this.handleError(err)
      });

      forkJoin({
        inner: this.inner$,
        outer: this.outer$,
        third: this.third$
      }).subscribe(v => {
        console.log('********', new Date());
        console.log(v);  // This will log: { inner: 'destination', outer: 'source', third: 'third' }
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

}

