import { createReducer, on } from "@ngrx/store";
import { apiLoading, apiResultsAction, testAct } from "./app.actions";
import { VehiclesResponseI } from "../Vehicle/Models/VehiclesI";

export interface AppInitialStateI {
    apiResponse: VehiclesResponseI;
    isLoading: boolean;
    testData: { id: number, name: string }
}

const initialState: AppInitialStateI = {
    apiResponse: null,
    isLoading: false,
    testData: null
}

export const appReducer = createReducer(
    initialState,


    on(apiResultsAction, (state, action) => {
        console.log('reducer log', action);

        return {
            ...state,
            apiResponse: action.value
        }
    }),


    on(apiLoading, (state, action) => ({
        ...state,
        isLoading: action.value
    })),

    on(testAct, (state, action) => {
        console.log(action);
        return {
            ...state,
            testData: action.value
        }
    })
)



