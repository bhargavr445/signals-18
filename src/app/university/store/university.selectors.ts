import { UniversityInitialStateI } from "./university.reducer";

export const UniversityListSelector = (state: {university: UniversityInitialStateI}) => state.university.universities;