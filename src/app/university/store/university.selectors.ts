import { createSelector } from "@ngrx/store";
import { UniversityInitialStateI } from "./university.reducer";

const universityState = (state: {university: UniversityInitialStateI}) => state.university;

export const UniversityListSelector = createSelector(universityState, (state: UniversityInitialStateI)=> state.universities)
//(state: {university: UniversityInitialStateI}) => state.university.universities;
// export const CountryListSelector = (state: {university: UniversityInitialStateI}) => state.university.countrysList;
export const CountryListSelector = createSelector(universityState, (state: UniversityInitialStateI)=> state.countrysList)
