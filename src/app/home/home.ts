import { NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, throwError } from 'rxjs';
import { VehicleService } from '../commons/services/api/vehicle.service';
import { DestroyComponent } from '../destroy/destroy.component';
import { Store } from '@ngrx/store';
import { Datum } from '../population/interfaces/population-responseI';
import { toSignal } from '@angular/core/rxjs-interop';
import * as selectors from '../app-store/app.selector';
import { fetchPopulationDataStartAction } from '../app-store/app.actions';
import { TableComponent } from "../commons/components/table/table.component";
import { TableSkeleton } from "../commons/components/table-skeleton/table-skeleton";

@Component({
    selector: 'app-home',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class Home extends DestroyComponent implements OnInit {

  #vehicleService = inject(VehicleService);
  form: FormGroup;

  constructor(df: DestroyRef) {
    super(df)
    // trigger api to drpwn
  }

  ngOnInit(): void {
      this.#store.dispatch(fetchPopulationDataStartAction({ value: 'United States' }));
    this.createForm()
    this.df

    this.form.get('userName').valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() =>  this.#vehicleService.getVehicleData('').pipe(catchError((error) => throwError(() => ({...error, errorFrom: 'API call 1'})))))
    ).subscribe((value) => {
      console.log(value);
    });

  }

  createForm() {
    this.form = new FormGroup({
      userName: new FormControl('')
    })
  }

  onEnter(event) {
    const value = event.target.value;
    of(value).pipe(
      debounceTime(1000),
    ).subscribe(() => console.log('ece'))
    
  }

  isVisible = false;

    openSlider() {
        this.isVisible = true;
    }

    closeSlider() {
        this.isVisible = false;
    }

      #store = inject(Store);
      tableheaders = signal([
        { label: 'Country Name', key: 'Nation', },
        { label: 'Year', key: 'Year', },
        { label: 'Population', key: 'Population' },
        { label: 'Increase/Descrease in %', key: 'diff' }
      ]);
    
      dataList = toSignal<Datum[]>(
        this.#store.select(selectors.populationDataResponseSelector).pipe(
          filter((d => !!d)),
          map((resp) => this.#calculateIncreasePercentage(resp.data))),
        this.#initialValue(null)
      );
      isLoading = toSignal(
        this.#store.select(selectors.populationDataLoadingStatusSelector),
        { initialValue: true }
      );
    

    
      #calculateIncreasePercentage(data: any[]): Datum[] {
        return data.map(d => {
          const previousYear = data.find(dl => parseInt(dl.Year) === parseInt(d.Year) - 1);
    
          let percentageDifference = 'N/A';
          if (previousYear) {
            const diff = d.Population - previousYear.Population;
            percentageDifference = ((diff / previousYear.Population) * 100).toFixed(2);
            percentageDifference = (diff >= 0 ? '+' : '') + percentageDifference + '%';
          }
          return { ...d, diff: percentageDifference };
        });
      }
    
      #initialValue<T>(value: T) {
        return { initialValue: value }
      }

}