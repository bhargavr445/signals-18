import { createAction, props } from "@ngrx/store";


const FETCH_ELECTIONS_DATA_START = 'FETCH_ELECTIONS_DATA_START';
const FETCH_ELECTIONS_DATA_SUCCESS_RESP = 'FETCH_ELECTIONS_DATA_SUCCESS_RESP';
const FETCH_ELECTIONS_DATA_ERROR_RESP = 'FETCH_ELECTIONS_DATA_ERROR_RESP';
const FETCH_ELECTIONS_DATA_LOADING = 'FETCH_ELECTIONS_DATA_LOADING';


export const fetch_elections_data_start = createAction(
    FETCH_ELECTIONS_DATA_START,
    //props<{value: CategorysI[]}>()
)

export const fetch_elections_data_success_resp = createAction(
    FETCH_ELECTIONS_DATA_SUCCESS_RESP,
    props<{value:any}>()
)

export const fetch_elections_data_error_resp = createAction(
    FETCH_ELECTIONS_DATA_ERROR_RESP,
    props<{value:any}>()
)

export const fetch_elections_data_loading = createAction(
    FETCH_ELECTIONS_DATA_LOADING,
    props<{value:boolean}>()
)
