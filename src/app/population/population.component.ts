import { Component, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../app/app-store/app.actions';
import * as selectors from '../../app/app-store/app.selector';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TableComponent } from '../commons/components/table/table.component';
import { Observable, combineLatest, filter, map, tap } from 'rxjs';
import { Datum } from './interfaces/population-responseI';
import { AuthService } from '../commons/services/api/auth.service';

@Component({
  selector: 'app-population',
  standalone: true,
  imports: [AsyncPipe, TableComponent, JsonPipe],
  templateUrl: './population.component.html',
  styleUrl: './population.component.scss'
})
export class PopulationComponent implements OnInit {

  as = inject(AuthService)
  store = inject(Store);
  tableheaders = signal([
    { label: 'Country Name', key: 'Nation', },
    { label: 'Year', key: 'Year', },
    { label: 'Population', key: 'Population' },
    { label: 'Increase/Descrease in %', key: 'diff' }
  ]);

  payload$ = this.store.select(selectors.populationDataPayloadSelector);
  dataList$: Observable<Datum[]> = this.store.select(selectors.populationDataResponseSelector).pipe(
    filter((d => !!d)),
    map((resp) => this.calculateIncreasePercentage(resp.data)),
  );
  isLoading$ = this.store.select(selectors.populationDataLoadingStatusSelector);

  ngOnInit(): void {
    this.store.dispatch(actions.fetchPopulationDataStartAction({ value: 'United States' }));

    combineLatest([
      this.as.userProfileSub$
    ]).subscribe(d => console.log(d))
  }

  private calculateIncreasePercentage(data: any[]) {
    return data.map(d => {
      const previousYear = data.find(dl => parseInt(dl.Year) === parseInt(d.Year) - 1);

      let percentageDifference = 'N/A';
      if (previousYear) {
        const diff = d.Population - previousYear.Population;
        percentageDifference = ((diff / previousYear.Population) * 100).toFixed(2);
        percentageDifference = (diff >= 0 ? '+' : '') + percentageDifference + '%';
      }

      return {
        ...d,
        diff: percentageDifference
      };
    });
  }


}
