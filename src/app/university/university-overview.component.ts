import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './store/university.actions';
import { UniversityListSelector } from './store/university.selectors';
import { filter, map, tap } from 'rxjs';
import { UniversityTableComponent } from './components/university-table/university-table.component';
import { UniversityListI } from './interfaces/UniversityListI';

@Component({
  selector: 'app-university-overview',
  standalone: true,
  imports: [UniversityTableComponent],
  templateUrl: './university-overview.component.html',
  styleUrl: './university-overview.component.scss'
})
export class UniversityOverviewComponent {

  store = inject(Store);
  universityList = signal<UniversityListI[]>([]);

  constructor() {
    this.#fetchUniversities('United Kingdom');
    this.store.select(UniversityListSelector)
      .pipe(
        tap(d => console.log(d)),
        filter(d => !!d),
        map((d) => {

          const uniL = [...d].sort((c, p) => p.name > c.name ? -1 : 1)
          return uniL;

        })
      )
      .subscribe(d => this.universityList.set(d))
  }

  #fetchUniversities(countryName: string) {
    this.store.dispatch(actions.fetchUniversitiesAction({ value: countryName }));
  }

  dropDownSelection(event) {
    this.#fetchUniversities(event);
  }

}
