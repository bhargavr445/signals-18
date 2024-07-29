import { createSelector } from "@ngrx/store";
import { AppInitialStateI } from "./app.reducer";

const appState = (state: { app: AppInitialStateI }) => state.app;

export const apiResultsSelector = createSelector(appState, (app: AppInitialStateI) => app.apiResponse);
export const apiLoadingSelector = createSelector(appState, (app: AppInitialStateI) => app.isLoading);
export const testDataSelector = createSelector(appState, (app: AppInitialStateI) => app.testData);
// export const apiLoadingSelector = createFeatureSelector<{app: AppInitialStateI}>('isLoading')
export const restSelector = createSelector(
    apiResultsSelector,
    apiLoadingSelector,
    (apiResults, apiLoadingSelector) => ({ res: apiResults, loading: apiLoadingSelector })
);

export const populationDataResponseSelector = createSelector(appState, (app: AppInitialStateI) => app.populationDataResponse);
export const populationDataPayloadSelector = createSelector(appState, (app: AppInitialStateI) => app.countryName);
export const populationDataErrorSelector = createSelector(appState, (app: AppInitialStateI) => app.populationDataErrorResponse);
export const populationDataLoadingStatusSelector = createSelector(appState, (app: AppInitialStateI) => app.populationDataLoading);