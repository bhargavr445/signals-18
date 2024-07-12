import { Actions, createEffect, ofType } from "@ngrx/effects";
import  * as actions  from "./app.actions";
import { Injectable } from "@angular/core";
import { endWith, map, startWith, switchMap, tap } from "rxjs";
import { VehicleService } from "../Vehicle/Services/vehicle.service";

@Injectable()
export class AppEffects {

    getRosteData = createEffect(
        () => this.actions$.pipe(
            ofType(actions.API_FETCHING_START),
            tap(a => console.log('in effect...', a)),
            switchMap((action) => {
                return this.vehicleService.getVehicleData('').pipe(
                    map((resp) => actions.apiResultsAction({ value: resp })),
                    startWith(actions.apiLoading({ value: true })),
                    endWith(actions.apiLoading({ value: false }))
                )
            })
        )
    )

    //


    //

    //

    constructor(private actions$: Actions, private vehicleService: VehicleService) {

    }
}