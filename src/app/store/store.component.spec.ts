import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreComponent } from './store.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { apiFetchingStart } from '../app-store/app.actions';
import { apiResultsSelector, apiLoadingSelector } from '../app-store/app.selector';
import { Observable, of } from 'rxjs';

fdescribe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialState = {
    app: {
      apiResponse: { Results: [{ id: 1, name: 'test' }] },
      isLoading: false
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreComponent, ReactiveFormsModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callFake((selector) => {
      if (selector === apiResultsSelector) {
        return of(initialState.app.apiResponse);
      }
      if (selector === apiLoadingSelector) {
        return of(initialState.app.isLoading);
      }
      return of();
    });

    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch apiFetchingStart on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(apiFetchingStart({value: ''}));
  });

  it('should update filteredRecords$ on search text change', (done) => {
    component.searchTextControl.setValue('test');
    component.filteredRecords$.subscribe(records => {
      expect(records).toEqual([{ id: 1, name: 'test' }]); // Adjust the expected value accordingly
      done();
    });
  });

  it('should call filterRecords', (done) => {
    const filterRecordsSpy = spyOn<any>(component, 'filterRecords');
    component.searchTextControl.setValue('test');
    component.filteredRecords$.subscribe(() => {
      expect(filterRecordsSpy).toHaveBeenCalledWith([{ id: 1, name: 'test' }], 'test');
      done();
    });
  });
});