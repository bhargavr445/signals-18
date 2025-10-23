import { computed, effect, inject } from "@angular/core";
import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { rxMethod, } from "@ngrx/signals/rxjs-interop";
import { of, pipe, switchMap, take, tap } from "rxjs";
import { VehicleService } from "../../commons/services/api/vehicle.service";
import { toObservable } from "@angular/core/rxjs-interop";


export interface DiscussionStateI {
    _name: string;
    _email: string;
    _vehicleResponse: any;
    _isApiInProgress: boolean;
    _apiList: any
}

export const initialState: DiscussionStateI = {
    _name: '',
    _email: '',
    _vehicleResponse: null,
    _isApiInProgress: false,
    _apiList: new Set<string>([])
}

export const DiscussionStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withProps((store) => ({
        vehicleService: inject(VehicleService),
        vehicleResponse$: toObservable(store._vehicleResponse)
    })),

    withMethods((store) => ({
        updateName(name: string): void {
            patchState(store, (state: DiscussionStateI) => ({ ...state, _name: name }))
        },

        showSpinner(url: string) {
            if (!store._apiList().has(url)) {
                const prevUrl = store._apiList();
                prevUrl.add(url);
                patchState(store, (state) => ({ ...state, _apiList: prevUrl, _isApiInProgress: true }))
            }
        },

        hideSpinner(url: string) {
            const prevUrl = store._apiList();
            prevUrl.delete(url);
            patchState(store, (state) => ({ ...state, _apiList: prevUrl, _isApiInProgress: prevUrl.size > 0 }))
        },

        // fetchData() {
        //     if(!store._name) {
        //         fetch('').then(() => ).catch()  
        //     }
        // }

        getUnivList: rxMethod<string>(
            pipe(
                switchMap((_inputParam) => store.vehicleService.getVehicleData().pipe(
                    tap({
                        next: (resp) => { patchState(store, (state) => ({ ...state, _vehicleResponse: resp })) },
                        error: (_) => { patchState(store, (state) => ({ ...state, _vehicleResponse: null })) },
                    })
                ))
            )
        )

    })),

    withComputed((store) => ({
        nameC: computed(() => store._name()),
        emailC: computed(() => store._email()),
        listC: computed(() => store._vehicleResponse()),
        isApiInProgress: computed(() => store._isApiInProgress()),
        apisList: computed(() => store._apiList()),
    })),

    withHooks({
        onInit(store) {
            effect(() => {
                const state = getState(store)
                console.log(state);

            })
        },
        onDestroy() {

        },
    })

);