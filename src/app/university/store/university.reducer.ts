import { createReducer, on } from "@ngrx/store";
import { countrysListFetchingStart, countrysListSuccess, universitiesListAction } from "./university.actions";
import { CountrysApiResponseI, UniversitiesApiResponseI, UniversityListI } from "../interfaces/UniversityListI";

export interface UniversityInitialStateI {
    universities: UniversitiesApiResponseI;
    countrysList: CountrysApiResponseI
}

const universityInitialValues: UniversityInitialStateI = {
    universities: null,
    countrysList: null
}


export const universityReducer = createReducer(
    universityInitialValues,

    on(universitiesListAction, (state, action) => ({
        ...state,
        universities: action.value
    })),

    on(countrysListSuccess, (state, action) => ({
        ...state,
        countrysList: action.value
    }))
)
