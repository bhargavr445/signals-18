import { createReducer, on } from "@ngrx/store";
import * as udemyActions from "./udemy.actions";
import { CategorysI, PurchasedCourseI } from "../interfaces/udemy-i";

export interface UdemyInitialStateI {
    categoryList: CategorysI[];
    categorysLoading: boolean;
    categoryApiError: any;

    /** fetch courses */
    createdCoursesList: PurchasedCourseI[];
    createdCoursesError: any;
    createdCoursesLoading: boolean;

    /** createCourse */
    createCourseSuccess: boolean;
    createCourseError: any;
    createCourseLoading: boolean;



}

const udemyInitialValues: UdemyInitialStateI = {
    categoryList: [],
    categorysLoading: false,
    categoryApiError: null,

    /** fetch courses */
    createdCoursesList: [],
    createdCoursesError: null,
    createdCoursesLoading: false,

    /**  createCourse */
    createCourseSuccess: false,
    createCourseError: null,
    createCourseLoading: false

}


export const udemyReducer = createReducer(
    udemyInitialValues,

    on(udemyActions.fetchCategorysSuccessAction, (state, action) => ({
        ...state,
        categoryList: action.value,
        categoryApiError: null
    })),
    on(udemyActions.fetchCategorysFailAction, (state, action) => ({
        ...state,
        categoryApiError: action.value,
        categoryList: []
    })),

    // fetch courses
    on(udemyActions.fetchAllCreatedCoursesSuccess, (state, action) => {
        console.log(action);

        return {
            ...state,
            createdCoursesList: action.value,
            createdCoursesError: null
        }
    }),

    on(udemyActions.fetchAllCreatedCoursesFail, (state, action) => ({
        ...state,
        createdCoursesError: action.value,
        createdCoursesList: []
    })),

    on(udemyActions.fetchAllCreatedCoursesLoading, (state, action) => ({
        ...state,
        createdCoursesLoading: action.value,
    })),

    /**
     * creating course
     */
    on(udemyActions.createCourseLoading, (state, action) => ({
        ...state,
        createCourseLoading: action.value,
    })),

    on(udemyActions.createCourseSuccess, (state, action) => ({
        ...state,
        createCourseSuccess: action.value,
    })),

    on(udemyActions.createCourseError, (state, action) => ({
        ...state,
        createCourseSuccess: action.value,
    })),

)