import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppInitialStateI } from "./app.reducer";

export const apiResultsSelector = (state: {app: AppInitialStateI}) => state.app.apiResponse;
export const apiLoadingSelector = (state: {app: AppInitialStateI}) => state.app.isLoading;
export const testDataSelector = (state: {app: AppInitialStateI}) => state.app.testData;
// export const apiLoadingSelector = createFeatureSelector<{app: AppInitialStateI}>('isLoading')
export const restSelector = createSelector(
    apiResultsSelector,
    apiLoadingSelector,
    (apiResults, apiLoadingSelector) => ({res: apiResults, loading: apiLoadingSelector})
)