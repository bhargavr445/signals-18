import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { COUNTRYS_LIST_FETCH_START, FETCH_UNIVERSITIES, countrysListSuccess, universitiesListAction } from "./university.actions";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs";
import { UniversityService } from "../services/university.service";
import { Action } from "@ngrx/store";

@Injectable()
export class UniversityEffects {



    fetchUniversities = createEffect(
        () => this.actions$.pipe(
            ofType(FETCH_UNIVERSITIES),
            tap((a) => console.log(a)),
            switchMap((action: Action) => this.universityService.getUniversities(action['value']).pipe(
                
                map((resp) => universitiesListAction({value: resp})),
                // catchError((error) => universitiesListError({value: resp}))
            ))
        )
    )

    fetchCountrysList = createEffect(
        () => this.actions$.pipe(
            ofType(COUNTRYS_LIST_FETCH_START),
            exhaustMap(() => this.universityService.getCountrys().pipe(
                map((response) => countrysListSuccess({value: response}))
            ))
        )
    )

    constructor(private actions$: Actions, private universityService: UniversityService) {

    }
}