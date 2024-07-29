import { createAction, props } from "@ngrx/store";
import { PopulationResponseI } from "../population/interfaces/population-responseI";

export const API_FETCHING_START = 'API_FETCHING_START';
export const API_RESULTS = 'API_RESULTS';
export const API_LOADING = 'API_LOADING';
export const API_ERROR = 'API_ERROR';

export const TEST_ACT = 'TEST_ACT';

export const FETCH_POPULATION_DATA_START = 'FETCH_POPULATION_DATA_START';
export const FETCH_POPULATION_SUCCESS_RESPONSE = 'FETCH_POPULATION_SUCCESS_RESPONSE';
export const FETCH_POPULATION_ERROR_RESPONSE = 'FETCH_POPULATION_ERROR_RESPONSE';
export const POPULATION_DATA_LOADING = 'POPULATION_DATA_LOADING';

// trigger action to start fetching data from API
export const apiFetchingStart = createAction(
    API_FETCHING_START,
    props<{value: string}>()
)


export const apiResultsAction = createAction(
    API_RESULTS,
    props<{ value: any }>()
)

export const apiLoading = createAction(
    API_LOADING,
    props<{ value: boolean }>()
)

export const apiError = createAction(
    API_ERROR,
    props<{value: any}>()
)

export const testAct = createAction(
    TEST_ACT,
    props<{value: {id: number, name: string}}>()
)

/**
 * 
 */
export const fetchPopulationDataStartAction = createAction(
    FETCH_POPULATION_DATA_START,
    props<{value: string}>()
)

export const populationDataSuccessResponse = createAction(
    FETCH_POPULATION_SUCCESS_RESPONSE,
    props<{value: PopulationResponseI}>()
)

export const populationDataErrorResponse = createAction(
    FETCH_POPULATION_ERROR_RESPONSE,
    props<{value: any}>()
)
export const populationDataLoading = createAction(
    POPULATION_DATA_LOADING,
    props<{value: boolean}>()
)
