import { createSelector } from "@ngrx/store";
import { ElectionsI } from "./elections-reducer";




const electionsState = (state: {elections: ElectionsI}) => state.elections;

export const electionSuccessDataSelector = createSelector(electionsState, (state: ElectionsI)=> state.electionsData);
export const electionsErrorDataSelector = createSelector(electionsState, (state: ElectionsI)=> state.electionsError);