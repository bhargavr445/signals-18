import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "./app.actions";
import { Injectable } from "@angular/core";
import { catchError, endWith, map, of, startWith, switchMap, tap } from "rxjs";
import { VehicleService } from "../commons/services/api/vehicle.service";
import { PopulationService } from "../population/population.service";

@Injectable()
export class AppEffects {

    getPopulationInfo$ = createEffect(
        () => this.actions$.pipe(
            // tap(d => console.log('hgjfr',d)),
            ofType(actions.fetchPopulationDataStartAction),
            // tap(d => console.log(d)),
            switchMap((action) => this.populationService.getPopulation(action.value).pipe(
                map((resp) => actions.populationDataSuccessResponse({ value: resp })),
                startWith(actions.populationDataLoading({ value: true })),
                endWith(actions.populationDataLoading({ value: false })),
                catchError((error) => of(actions.populationDataErrorResponse({ value: error })))
            ))
        )
    )

    getRosteData = createEffect(
        () => this.actions$.pipe(
            // tap(d => console.log('test test',d)),

            ofType(actions.API_FETCHING_START),
            // tap(d => console.log(d)),
            switchMap((action) => {
                return this.vehicleService.getVehicleData('').pipe(
                    map((resp) => actions.apiResultsAction({ value: resp })),
                    startWith(actions.apiLoading({ value: true })),
                    endWith(actions.apiLoading({ value: false }))
                )
            })
        )
    )

    constructor(private actions$: Actions, private vehicleService: VehicleService, private populationService: PopulationService) {

    }
}