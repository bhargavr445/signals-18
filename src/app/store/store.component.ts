import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { testAct } from '../app-store/app.actions';
import { apiLoadingSelector, apiResultsSelector, testDataSelector } from '../app-store/app.selector';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, filter, map, startWith, tap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Result } from '../Vehicle/Models/VehiclesI';

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

  apiResp$ = this.store.select(apiResultsSelector).pipe(tap((d) => console.log(d)));
  apiLoading$ = this.store.select(apiLoadingSelector).pipe(tap((d) => console.log(d)));
  // data$ = this.store.select(testDataSelector);
  filteredRecords$: Observable<any>
  x$ = this.store.select(testDataSelector).pipe(tap((d) => console.log(d)));

  constructor() {

    let a = 8 , b = 48;
    console.log(a);
    console.log(b);
    
    [a,b] = [b,a];
    console.log(a);
    console.log(b);
    
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

  #filterRecords(d: Result[], s: string) {
    return d.filter(d => Object.keys(d).some(key => this.#check(d[key], s)))
  }

  #check(data: string | number, searchText: string) {
    return data.toString().toLowerCase().includes(searchText)
  }

}
