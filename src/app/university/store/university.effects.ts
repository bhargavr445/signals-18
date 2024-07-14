import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FETCH_UNIVERSITIES, universitiesListAction } from "./university.actions";
import { map, switchMap, tap } from "rxjs";
import { UniversityService } from "../services/university.service";
import { Action } from "@ngrx/store";

@Injectable()
export class UniversityEffects {



    fetchUniversities = createEffect(
        () => this.actions$.pipe(
            ofType(FETCH_UNIVERSITIES),
            tap((a) => console.log(a)),
            switchMap((action: Action) => this.universityService.getUniversities(action['value']).pipe(
                
                map((resp) => universitiesListAction({value: resp}))
            ))
        )
    )

    constructor(private actions$: Actions, private universityService: UniversityService) {

    }
}