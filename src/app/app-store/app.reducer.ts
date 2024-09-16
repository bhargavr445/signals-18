import { createReducer, on } from "@ngrx/store";
import { apiLoading, apiResultsAction, fetchPopulationDataStartAction, populationDataErrorResponse, populationDataLoading, populationDataSuccessResponse, testAct } from "./app.actions";
import { VehiclesResponseI } from "../Vehicle/Models/VehiclesI";
import { PopulationResponseI } from "../population/interfaces/population-responseI";

export interface AppInitialStateI {
    apiResponse: VehiclesResponseI;
    isLoading: boolean;
    testData: { id: number, name: string };
    countryName: string
    populationDataResponse: PopulationResponseI;
    populationDataErrorResponse: any;
    populationDataLoading: boolean;
}

export const initialState: AppInitialStateI = {
    apiResponse: null,
    isLoading: false,
    testData: null,
    countryName: '',
    populationDataResponse: null,
    populationDataErrorResponse: null,
    populationDataLoading: false
}

export const appReducer = createReducer(
    initialState,

    on(apiResultsAction, (state, action) => ({
        ...state,
        apiResponse: action.value
    })),


    on(apiLoading, (state, action) => ({
        ...state,
        isLoading: action.value
    })),

    on(testAct, (state, action) => ({
        ...state,
        testData: action.value
    })),

    on(fetchPopulationDataStartAction, (state, action) => ({
        ...state,
        countryName: action.value
    })),

    on(populationDataSuccessResponse, (state, action) => ({
        ...state,
        populationDataResponse: action.value
    })),

    on(populationDataErrorResponse, (state, action) => ({
        ...state,
        populationDataErrorResponse: action.value
    })),

    on(populationDataLoading, (state, action) => ({
        ...state,
        populationDataLoading: action.value
    }))

)
