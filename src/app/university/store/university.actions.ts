import { createAction, props } from "@ngrx/store";
import { UniversityListI } from "../interfaces/UniversityListI";

export const FETCH_UNIVERSITIES = 'FETCH_UNIVERSITIES';
export const UNIVERSITIES_LIST = 'UNIVERSITIES_LIST';

export const fetchUniversitiesAction = createAction(
    FETCH_UNIVERSITIES,
    props<{value: string}>()
)

export const universitiesListAction = createAction(
    UNIVERSITIES_LIST,
    props<{value: UniversityListI[]}>()
)



