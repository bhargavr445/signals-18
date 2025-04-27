import * as _ from "@ngrx/signals"
import { Result } from "../../Vehicle/Models/VehiclesI"
import { computed, inject } from "@angular/core";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";
import { VehicleService } from "../services/api/vehicle.service";

interface CommonStoreI {
    vehiclesList: Result[]
}

const commonStoreInitialvalues: CommonStoreI = {
    vehiclesList: []
}

export const CommonSignalStore = _.signalStore(

    { providedIn: 'root' },

    _.withState<CommonStoreI>(commonStoreInitialvalues),

    _.withMethods((store) => ({

        addVehicleToCart(vehicle: Result): void {
            _.patchState(store, (state: CommonStoreI) => ({ ...state, vehiclesList: [...state.vehiclesList, vehicle] }))
        },

        removeitemFromCart(customId: string): void {
            _.patchState(store, (state: CommonStoreI) => ({ ...state, vehiclesList: state.vehiclesList.filter((item) => item.customId !== customId) }))
        }

    })),

    _.withComputed((state) => ({

        noOfVehiclesInCart: computed(() => state.vehiclesList().length),

        vehilesInCart: computed(() => state.vehiclesList())

    }))


);
