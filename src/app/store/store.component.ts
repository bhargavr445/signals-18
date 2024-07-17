import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { apiFetchingStart, testAct } from '../app-store/app.actions';
import { apiLoadingSelector, apiResultsSelector, testDataSelector } from '../app-store/app.selector';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, filter, map, startWith, tap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {

  store = inject(Store);
  searchTextControl = new FormControl('');

  apiResp$ = this.store.select(apiResultsSelector);
  apiLoading$ = this.store.select(apiLoadingSelector);
  filteredRecords$: Observable<any>
  x$ = this.store.select(testDataSelector);

  constructor() {
    
  }

  ngOnInit(): void {

    this.apiLoading$.subscribe(d => console.log(d));

    const searchTextControl$ = this.searchTextControl.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      distinctUntilChanged()
    )
    this.store.dispatch(testAct({value: {id: 10, name: 'Bhargav'}}));
    this.filteredRecords$ = combineLatest([
      this.apiResp$.pipe(map(d => d?.Results ?? [])),
      searchTextControl$]
    ).pipe(
      filter(([d, _]) => d.length > 0),
      map(([d, s]) => this.#filterRecords(d, s)))
  }

  #filterRecords(d, s) {
    return d.filter(d => Object.keys(d).some(key => this.#check(d[key], s)))
  }

  #check(data, searchText) {
    return data.toString().toLowerCase().includes(searchText)
  }

}
