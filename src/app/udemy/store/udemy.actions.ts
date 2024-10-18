import { createAction, props } from "@ngrx/store";
import { CategorysI, CourseI, CreateCoursePayloadI, PurchasedCourseI } from "../interfaces/udemy-i";

export const FETCH_CATEGORYS_SUCCESS = 'FETCH_CATEGORYS_SUCCESS';
export const FETCH_CATEGORYS = 'FETCH_CATEGORYS';
export const FETCH_CATEGORYS_FAIL = 'FETCH_CATEGORYS_FAIL';
export const FETCH_CATEGORYS_LOADING = 'FETCH_CATEGORYS_LOADING';

export const FETCH_ALL_CREATED_COURSES_START = 'FETCH_ALL_CREATED_COURSES_START';
export const FETCH_ALL_CREATED_COURSES_SUCCESS = 'FETCH_ALL_CREATED_COURSES_SUCCESS';
export const FETCH_ALL_CREATED_COURSES_FAIL = 'FETCH_ALL_CREATED_COURSES_FAIL';
export const FETCH_ALL_CREATED_COURSES_LOADING = 'FETCH_ALL_CREATED_COURSES_LOADING';


export const CREATE_COURSE_START = 'CREATE_COURSE_START';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_FAIL = 'CREATE_COURSE_FAIL';
export const CREATE_COURSE_LOADING = 'CREATE_COURSE_LOADING';




export const fetchCategorysStartAction = createAction(
    FETCH_CATEGORYS,
)

export const fetchCategorysSuccessAction = createAction(
    FETCH_CATEGORYS_SUCCESS,
    props<{value: CategorysI[]}>()
)

export const fetchCategorysFailAction = createAction(
    FETCH_CATEGORYS_FAIL,
    props<{value: any}>()
)


export const fetchAllCreatedCoursesStart = createAction(
    FETCH_ALL_CREATED_COURSES_START,
)

export const fetchAllCreatedCoursesSuccess = createAction(
    FETCH_ALL_CREATED_COURSES_SUCCESS,
    props<{value: PurchasedCourseI[]}>()
)


export const fetchAllCreatedCoursesFail = createAction(
    FETCH_ALL_CREATED_COURSES_FAIL,
    props<{value: any}>()
)

export const fetchAllCreatedCoursesLoading = createAction(
    FETCH_ALL_CREATED_COURSES_LOADING,
    props<{value: boolean}>()
)



export const createCourseStart = createAction(
    CREATE_COURSE_START,
    props<{value: CreateCoursePayloadI}>()
)

export const createCourseSuccess = createAction(
    CREATE_COURSE_SUCCESS,
    props<{value: boolean}>()
)

export const createCourseError = createAction(
    CREATE_COURSE_FAIL,
    props<{value: any}>()
)

export const createCourseLoading = createAction(
    CREATE_COURSE_LOADING,
    props<{value: boolean}>()
)
