import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as electionActions from "./elections-actions";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { ElectionsService } from "../../elections.service";
import { Store } from "@ngrx/store";



@Injectable()
export class ElectionEffects {
    //
    //


    electionsApi$ = createEffect(
        () => this.actions$.pipe(
            ofType(electionActions.fetch_elections_data_start),
            // withLatestFrom(this.store.select(electionActions.fetch_elections_data_success_resp)),
            switchMap(() => this.electionsService.fetchElectionsData().pipe(
                map((data) => electionActions.fetch_elections_data_success_resp({ value: data })),
                catchError((error) => of(electionActions.fetch_elections_data_error_resp({value: error})))
            )
            )
        )
    )

    constructor(private actions$: Actions, private electionsService: ElectionsService, private store: Store) {
    
            console.log('************************* Udemy Effects loaded...')
    
        }

}