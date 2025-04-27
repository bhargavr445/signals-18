import { computed, inject } from "@angular/core";
import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals";
import { ElectionsService } from "../../elections.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";

export interface ElectionI {
    candidates: string[];
    results: number;
    resutsDate: string;
    completeElectionSuccessData: any;
}

const initialValues: ElectionI = {
    candidates: [],
    results: null,
    resutsDate: '',
    completeElectionSuccessData: null

}


export const ElectionStore = signalStore(

    withState(initialValues),

    withProps((store) => {
        return {
            electionsService: inject(ElectionsService)
        }
    }),

    withMethods((store) => ({
        
        updateCandidate(candidateName: string): void {
            patchState(store, (state) => ({...state, candidates: [...state.candidates, candidateName]}))
        },
        updateResults(): void {
            // store.electionsService.fetchElectionsData()
        },
        updateResultsDate(): void {

        },
        fetchElectionData: rxMethod<void>(
            pipe(
                switchMap(() =>store.electionsService.fetchElectionsData().pipe(
                    tap({
                        next: (successResp) => {
                            patchState(store, (state: ElectionI) => ({...state, completeElectionSuccessData: successResp}))
                        },
                        error: (error) => {}
                    })
                ))
            )
        )

    })),

    withProps((store) => ({
        candidatesC: computed(() => store.candidates()),
        completeElectionSuccessDataC: computed(() => store.completeElectionSuccessData())
    // results: null,
    // resutsDate: '',
    }))

);


