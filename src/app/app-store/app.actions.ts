import { createAction, props } from "@ngrx/store";

export const API_FETCHING_START = 'API_FETCHING_START';
export const API_RESULTS = 'API_RESULTS';
export const API_LOADING = 'API_LOADING';
export const API_ERROR = 'API_ERROR';

export const TEST_ACT = 'TEST_ACT';

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
