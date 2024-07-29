import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationComponent } from './population.component';
import {initialState} from '../app-store/app.reducer'
import * as selectors from '../../app/app-store/app.selector';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as actions from '../../app/app-store/app.actions';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
const data = {
  "data": [
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2022,
      "Year": "2022",
      "Population": 331097593,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2021,
      "Year": "2021",
      "Population": 329725481,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2020,
      "Year": "2020",
      "Population": 326569308,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2019,
      "Year": "2019",
      "Population": 324697795,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2018,
      "Year": "2018",
      "Population": 322903030,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2017,
      "Year": "2017",
      "Population": 321004407,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2016,
      "Year": "2016",
      "Population": 318558162,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2015,
      "Year": "2015",
      "Population": 316515021,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2014,
      "Year": "2014",
      "Population": 314107084,
      "Slug Nation": "united-states"
    },
    {
      "ID Nation": "01000US",
      "Nation": "United States",
      "ID Year": 2013,
      "Year": "2013",
      "Population": 311536594,
      "Slug Nation": "united-states"
    }
  ],
  "source": [
    {
      "measures": [
        "Population"
      ],
      "annotations": {
        "source_name": "Census Bureau",
        "source_description": "The American Community Survey (ACS) is conducted by the US Census and sent to a portion of the population every year.",
        "dataset_name": "ACS 5-year Estimate",
        "dataset_link": "http://www.census.gov/programs-surveys/acs/",
        "table_id": "B01003",
        "topic": "Diversity",
        "subtopic": "Demographics"
      },
      "name": "acs_yg_total_population_5",
      "substitutions": []
    }
  ]
}

fdescribe('PopulationComponent', () => {
  let component: PopulationComponent;
  let fixture: ComponentFixture<PopulationComponent>;
  let store: MockStore
  const initialStateD = {app: initialState}
  let dispatchSpy: jasmine.Spy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulationComponent],
      providers: [
        provideMockStore({initialState: initialStateD})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationComponent);
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component = fixture.componentInstance;
    store.overrideSelector(selectors.populationDataPayloadSelector, 'India');
    store.overrideSelector(selectors.populationDataResponseSelector, data);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledOnceWith(actions.fetchPopulationDataStartAction({value: 'United States'}))
    component.payload$.subscribe(d => expect(d).toEqual('India'));
  });
});
