import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetch_elections_data_start } from './store/elections-actions';
import { electionsErrorDataSelector, electionSuccessDataSelector } from './store/elections-selector';
import { AsyncPipe, JsonPipe } from '@angular/common';


@Component({
  selector: 'app-elections',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './elections.component.html',
  styleUrl: './elections.component.scss'
})
export class ElectionsComponent {

  store = inject(Store);
  eleectiondData$ = this.store.select(electionSuccessDataSelector);
  eleectiondDataError$ = this.store.select(electionsErrorDataSelector);


  constructor() {
    this.fetchData();
  }

  fetchData() {
    // this.eleectiondData$.subscribe((data) =>if())
    this.store.dispatch(fetch_elections_data_start());
  }

}
