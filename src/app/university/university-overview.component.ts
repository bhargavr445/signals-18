import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs';
import { UniversityTableComponent } from './components/university-table/university-table.component';
import { CountrysApiResponseI, CountrysI } from './interfaces/UniversityListI';
import * as actions from './store/university.actions';
import { CountryListSelector, UniversityListSelector } from './store/university.selectors';

@Component({
    selector: 'app-university-overview',
    imports: [UniversityTableComponent],
    templateUrl: './university-overview.component.html',
    styleUrl: './university-overview.component.scss'
})
export class UniversityOverviewComponent {

  #store = inject(Store);
  universityList = toSignal(this.#store.select(UniversityListSelector)
    .pipe(
      filter(d => !!d),
      map((d) => [...d.data].sort((c, p) => p.name > c.name ? -1 : 1)),
    ), { initialValue: [] });

  countrysList: Signal<string[]> = toSignal(this.#store.select(CountryListSelector)
    .pipe(
      filter((resp) => !!resp),
      map((countrysResponse: CountrysApiResponseI) => countrysResponse.data.map((countryObj: CountrysI) => countryObj.name).sort()),
      tap((countrysList: string[]) => this.#fetchUniversities(countrysList[0])),
      take(1)
    ), { initialValue: [] });

  constructor() {
    this.#store.dispatch(actions.countrysListFetchingStart());
  }

  #fetchUniversities(countryName: string): void {
    this.#store.dispatch(actions.fetchUniversitiesAction({ value: countryName }));
  }

  dropDownSelection(event): void {
    this.#fetchUniversities(event);
  }

}

