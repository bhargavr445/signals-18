import { Component, OnInit, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import * as actions from '../../app/app-store/app.actions';
import * as selectors from '../../app/app-store/app.selector';
import { TableSkeletonComponent } from '../commons/components/table-skeleton/table-skeleton.component';
import { TableComponent } from '../commons/components/table/table.component';
import { Datum } from './interfaces/population-responseI';

@Component({
  selector: 'app-population',
  standalone: true,
  imports: [TableComponent, TableSkeletonComponent],
  template: `
  <div class="main">
    @if(!isLoading()) {
    <gbr-table [tableHeaders]="tableheaders()" [dataList]="dataList()" />
    } @else {
    <table-skeleton />
    }
  </div>
  `
})
export class PopulationComponent implements OnInit {

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

  ngOnInit(): void {
    this.#store.dispatch(actions.fetchPopulationDataStartAction({ value: 'United States' }));
  }

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
