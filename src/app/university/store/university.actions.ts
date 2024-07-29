import { createAction, props } from "@ngrx/store";
import { CountrysApiResponseI, UniversitiesApiResponseI, UniversityListI } from "../interfaces/UniversityListI";

export const FETCH_UNIVERSITIES = 'FETCH_UNIVERSITIES';
export const UNIVERSITIES_LIST = 'UNIVERSITIES_LIST';

export const COUNTRYS_LIST_FETCH_START = 'COUNTRYS_LIST_FETCH_START';
export const COUNTRYS_LIST_FETCH_SUCCESS = 'COUNTRYS_LIST_FETCH_SUCCESS';


export const fetchUniversitiesAction = createAction(
    FETCH_UNIVERSITIES,
    props<{value: string}>()
)

export const universitiesListAction = createAction(
    UNIVERSITIES_LIST,
    props<{value: UniversitiesApiResponseI}>()
)

export const countrysListFetchingStart = createAction(
    COUNTRYS_LIST_FETCH_START,
    //props<{value: string}>()
)

export const countrysListSuccess = createAction(
    COUNTRYS_LIST_FETCH_SUCCESS,
    props<{value: CountrysApiResponseI}>()
)



