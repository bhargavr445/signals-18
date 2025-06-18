import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { VehicleService } from '../../commons/services/api/vehicle.service';
import { computed, inject } from '@angular/core';
import { VehiclesResponseI } from '../Models/VehiclesI';

interface VehicleStoreI {
    vehiclesCount: number;
    vehiclesList: VehiclesResponseI
}

const vehicleInitialState: VehicleStoreI = {
    vehiclesCount: 10,
    vehiclesList: { Count: null, Message: '', SearchCriteria: '', Results: [] }
}

export const VehicleStore = signalStore(
    // { providedIn: 'root' },

    withState(vehicleInitialState),
    withMethods((store, vehicleService = inject(VehicleService)) => ({

        updateCount(): void {
            patchState(store, (state: VehicleStoreI) => ({ ...state, vehiclesCount: 20 }))
        },

        loadVehicles: rxMethod<void>(
            pipe(
                switchMap(() => vehicleService.getVehicleData().pipe(
                    tap({
                        next: (response: VehiclesResponseI) => patchState(store, (state: VehicleStoreI) => ({ ...state, vehiclesList: response })),
                        error: (error) => console.log(error)
                    })
                ))
            )
        )

    })),

    withComputed((state) => ({
        vehiclesListC: computed(() => state.vehiclesList())
    }))
)