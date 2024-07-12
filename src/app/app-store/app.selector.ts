import { AppInitialStateI } from "./app.reducer";

export const apiResultsSelector = (state: {app: AppInitialStateI}) => state.app.apiResponse;
export const apiLoadingSelector = (state: {app: AppInitialStateI}) => state.app.isLoading;
export const testDataSelector = (state: {app: AppInitialStateI}) => state.app.testData;