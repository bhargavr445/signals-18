import { createReducer, on } from "@ngrx/store";
import * as electionActions from "./elections-actions";

export interface ElectionsI {
    electionsData: any;
    electionsError: any;
    electionsApiLoading: boolean;
}

const ElectionsInitialState: ElectionsI = {
    electionsData: null,
    electionsError: null,
    electionsApiLoading: false
}

export const electionsReducer = createReducer(
    ElectionsInitialState, 

    on(electionActions.fetch_elections_data_success_resp, (state, action) => {
        return {
            ...state,
            electionsData: action.value,
            electionsError: null
        }
    }),

    on(electionActions.fetch_elections_data_error_resp, (state, action) => {
        return {
            ...state,
            electionsError: action.value,
            electionsData: null
        }
    }),

    on(electionActions.fetch_elections_data_loading, (state, action) => {
        return {
            ...state,
            electionsApiLoading: action.value
        }
    })

)