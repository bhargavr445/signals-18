import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UdemyService } from "../../commons/services/api/udemy.service";
import * as udemyActions from "./udemy.actions";
import { catchError, endWith, exhaustMap, finalize, map, mergeMap, of, startWith, switchMap } from "rxjs";
import { CategorysResponseI, FetchAllCoursesI } from "../interfaces/udemy-i";
import { Action } from "@ngrx/store";

@Injectable()
export class UdemyEffects {

    fetchCategorys = createEffect(
        () => this.actions$.pipe(
            ofType(udemyActions.fetchCategorysStartAction),
            exhaustMap(() => this.udemyService.fetchCategorys().pipe(
                map((response: CategorysResponseI) => udemyActions.fetchCategorysSuccessAction({ value: response.data })),
                catchError((error) => of(udemyActions.fetchCategorysFailAction({ value: error })))
            ))
        )
    )

    fetchCreatedCourses = createEffect(
        () => this.actions$.pipe(
            ofType(udemyActions.fetchAllCreatedCoursesStart),
            exhaustMap(() => this.udemyService.fetchAllCreatedCourses().pipe(
                startWith(udemyActions.fetchAllCreatedCoursesLoading({ value: true })),
                map((response: FetchAllCoursesI) => udemyActions.fetchAllCreatedCoursesSuccess({ value: response.data })
                ),
                catchError((error) => of(udemyActions.fetchAllCreatedCoursesFail({ value: error }))),
                finalize(() => udemyActions.fetchAllCreatedCoursesLoading({ value: false }))
            ))
        )
    )

    createCourse = createEffect(
        () => this.actions$.pipe(
            ofType(udemyActions.createCourseStart),
            exhaustMap((action) => this.udemyService.createCourse(action.value).pipe(
                mergeMap((response: boolean) => [
                    udemyActions.fetchAllCreatedCoursesStart(),
                    udemyActions.createCourseSuccess({ value: response })
                ]),
                catchError((error) => of(udemyActions.createCourseError({ value: error }))),
                startWith(udemyActions.createCourseLoading({ value: true })),
                endWith(udemyActions.createCourseLoading({ value: false }))
            ))
        )
    )

    constructor(private actions$: Actions, private udemyService: UdemyService) {

    }

}