import { createSelector } from "@ngrx/store";
import { UdemyInitialStateI } from "./udemy.reducer";

const udemyState = (state: {udemy: UdemyInitialStateI}) => state.udemy;

export const categoryListSelector = createSelector(udemyState, (state: UdemyInitialStateI)=> state.categoryList)
export const categoryApiErrorSelector = createSelector(udemyState, (state: UdemyInitialStateI)=> state.categoryApiError)

export const createdCoursesListSelector = createSelector(udemyState, (state: UdemyInitialStateI)=> state.createdCoursesList)
export const createdCoursesErrorSelector = createSelector(udemyState, (state: UdemyInitialStateI)=> state.createdCoursesError)
export const createdCoursesLoadingSelector = createSelector(udemyState, (state: UdemyInitialStateI)=> state.createdCoursesLoading)


export const createCourseSuccessSelector = createSelector(udemyState, (state: UdemyInitialStateI)=> state.createCourseSuccess);
export const createCourseLoadingSelector = createSelector(udemyState, (state: UdemyInitialStateI)=> state.createCourseLoading);


