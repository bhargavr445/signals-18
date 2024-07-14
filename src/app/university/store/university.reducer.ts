import { createReducer, on } from "@ngrx/store";
import { universitiesListAction } from "./university.actions";
import { UniversityListI } from "../interfaces/UniversityListI";

export interface UniversityInitialStateI {
    universities: UniversityListI[];
}

const universityInitialValues: UniversityInitialStateI = {
    universities: []
}


export const universityReducer = createReducer(
    universityInitialValues,

    on(universitiesListAction, (state, action) => ({
        ...state,
        universities: action.value
    }))
)