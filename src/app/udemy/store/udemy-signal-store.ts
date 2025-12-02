import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, pipe, switchMap, tap } from "rxjs";
import { UdemyService } from "../../commons/services/api/udemy.service";
import { CategorysI, CreateCoursePayloadI, PurchasedCourseI } from "../interfaces/udemy-i";

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

export const UdemySignalStore = signalStore(

    withState(udemyInitialValues),

    withProps((store) => ({
        udemyService: inject(UdemyService)
    })),

    withMethods((store) => ({

        fetchCreatedCourses: rxMethod(
            pipe(
                tap(() => patchState(store, (state) => ({ ...state, createdCoursesLoading: true }))),
                switchMap(() => store.udemyService.fetchAllCreatedCourses().pipe(
                    tap({
                        next: (data) => patchState(store, (state) => ({ ...state, createdCoursesLoading: false, createdCoursesList: data.data })),
                        error: (error) => patchState(store, (state) => ({ ...state, createdCoursesLoading: false, createdCoursesError: error })),
                    })
                ))
            )
        ),

        createCourse: rxMethod<CreateCoursePayloadI>(
            pipe(
                // tap((pay) => console.log(pay)),
                tap(() => patchState(store, (state) => ({ ...state, createCourseLoading: true }))),
                exhaustMap((pay: CreateCoursePayloadI) => store.udemyService.createCourse(pay).pipe(
                    tap({
                        next: (data) => {
                            
                            patchState(store, (state) => ({ ...state, createCourseLoading: false, createCourseSuccess: data }))},
                        error: (error) => patchState(store, (state) => ({ ...state, createCourseLoading: false, createdCoursesError: error })),
                    }),
                    switchMap(() => store.udemyService.fetchAllCreatedCourses().pipe(
                        tap({
                            next: (data) => patchState(store, (state) => ({ ...state, createdCoursesLoading: false, createdCoursesList: data.data })),
                            error: (error) => patchState(store, (state) => ({ ...state, createdCoursesLoading: false, createdCoursesError: error })),
                        })
                    )),

                ))
            )
        ),

        loadCategorys: rxMethod<any>(
            pipe(
                tap(() => patchState(store, (state) => ({ ...state, categorysLoading: true }))),
                switchMap(() => store.udemyService.fetchCategorys().pipe(
                    tap({
                        next: (data) => patchState(store, (state) => ({ ...state, categorysLoading: false, categoryList: data.data })),
                        error: (error) => patchState(store, (state) => ({ ...state, categorysLoading: false, categoryApiError: error })),
                    })
                ))
            )
        )

    })),

    withComputed((store) => ({

        categorysListC: computed(() => store.categoryList()),
        categorysListLoadingC: computed(() => store.categorysLoading()),

        createCourseSuccessC: computed(() => store.createCourseSuccess()),
        createCourseLoadingC: computed(() => store.createCourseLoading()),

        createdCoursesListC: computed(() => store.createdCoursesList()),
        createdCoursesLoadingC: computed(() => store.createdCoursesLoading()),

    }))
);


