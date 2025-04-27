import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as electionActions from "./elections-actions";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { ElectionsService } from "../../elections.service";
import { Store } from "@ngrx/store";
import { electionSuccessDataSelector } from "./elections-selector";

@Injectable()
export class ElectionEffects {

    #actions$ = inject(Actions);
    #electionsService = inject(ElectionsService);
    #store = inject(Store);

    electionsApi$ = createEffect(
        () => this.#actions$.pipe(
            ofType(electionActions.fetch_elections_data_start),
            withLatestFrom(this.#store.select(electionSuccessDataSelector)),
            switchMap(([_, suc]) => suc ? of(suc) : this.#electionsService.fetchElectionsData().pipe(
                map((data) => electionActions.fetch_elections_data_success_resp({ value: data })),
                catchError((error) => of(electionActions.fetch_elections_data_error_resp({ value: error })))))
        )
    )

}
