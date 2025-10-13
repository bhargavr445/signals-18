import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { VehicleService } from '../../commons/services/api/vehicle.service';
import { computed, inject } from '@angular/core';
import { VehiclesResponseI } from '../Models/VehiclesI';

interface VehicleStoreI {
    _vehiclesCount: number;
    _vehiclesList: VehiclesResponseI;
    _vehicleListApiErrorResponse: any;
}

export const vehicleInitialState: VehicleStoreI = {
    _vehiclesCount: 10,
    _vehiclesList: { Count: null, Message: '', SearchCriteria: '', Results: [] },
    _vehicleListApiErrorResponse: null,
}

export const VehicleStore = signalStore(
    
    { providedIn: 'root' },

    withState({
        _vehiclesCount: 10,
        _vehiclesList: { Count: null, Message: '', SearchCriteria: '', Results: [] },
        _vehicleListApiErrorResponse: null,
    }),
    withMethods((store, _vehicleService = inject(VehicleService)) => ({

        updateCount(): void {
            patchState(store, (state: VehicleStoreI) => ({ ...state, _vehiclesCount: 20 }))
        },

        loadVehicles: rxMethod<void>(
            pipe(
                switchMap(() => _vehicleService.getVehicleData().pipe(
                    tap({
                        next: (response: VehiclesResponseI) => patchState(store, (state: VehicleStoreI) => ({ ...state, _vehiclesList: response, _vehicleListApiErrorResponse: null })),
                    }),
                    catchError((error) => {
                        patchState(store, (state: VehicleStoreI) => ({ ...state, _vehiclesList: null, _vehicleListApiErrorResponse: error }))
                        return EMPTY
                    })
                ))
            )
        )
    })),

    withComputed((state) => ({
        vehiclesListC: computed(() => state._vehiclesList()),
        vehiclesCountC: computed(() => state._vehiclesCount()),
        vehiclesListApiErrorC: computed(() => state._vehicleListApiErrorResponse())
    }))
)