import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreComponent } from './store.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { apiFetchingStart } from '../app-store/app.actions';
import { apiResultsSelector, apiLoadingSelector, restSelector } from '../app-store/app.selector';
import { Observable, of } from 'rxjs';

describe('StoreComponent', () => {
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

    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filteredRecords$ on search text change', (done) => {
    component.searchTextControl.setValue('test');
    component.filteredRecords$.subscribe(records => {
      expect(records).toEqual([{ id: 1, name: 'test' }]); // Adjust the expected value accordingly
      done();
    });
  });


  it('shou;d test get Data', () => {
    const init = {
      res: {
        Count: 1,
        Message: 'mes',
        SearchCriteria: 'merc',
        Results: [{
          MakeId: 1, MakeName: 'test', VehicleTypeId: 10,
          VehicleTypeName: 'MyName',
          customId: 'string'
        }]
      },
      loading: true
    }

    const init2 = {
      res: {
        Count: 1,
        Message: 'mes',
        SearchCriteria: 'merc',
        Results: [
          {
            MakeId: 1,
            MakeName: 'test',
            VehicleTypeId: 10,
            VehicleTypeName: 'MyName',
            customId: 'string'
          },
          {
            MakeId: 1,
            MakeName: 'test',
            VehicleTypeId: 10,
            VehicleTypeName: 'MyName',
            customId: 'string'
          }
        ]
      },
      loading: true
    }
    const re = store.overrideSelector(restSelector, init);
    re.setResult(init2)
    
  })
});