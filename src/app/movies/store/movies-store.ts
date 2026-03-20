import { computed, inject } from "@angular/core";
import { eventGroup, Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { signalStore, type, withComputed, withProps, withState } from "@ngrx/signals";
import { MoviesService } from "../../commons/services/api/movies.service";
import { catchError, EMPTY, map, of, switchMap, tap } from "rxjs";
import { MoviesAPIResponseI } from "../../university/interfaces/UniversityListI";

export const moviesEvents = eventGroup({
    source: '[Movies API] Fetch Movies',
    events: {
        loadMovies: type<void>(),
        moviesApiSuccess: type<MoviesAPIResponseI>(),
        moviesApiError: type<any>(),
        moviesApiLoading: type<boolean>()
    }
})

export const moviesStore = signalStore(
    withState({
        _moviesApiSuccessResponse: null,
        _moviesApiErrorResponse: null,
        _moviesApiIsLoading: false
    }),
    withProps((store) => ({
        moviesService: inject(MoviesService),
        event: inject(Events)
    })),
    withReducer(
        on(moviesEvents.moviesApiSuccess, ({ payload: _moviesApiSuccessResponse }) => {
            return {
                _moviesApiSuccessResponse,
                _moviesApiIsLoading: false,
                _moviesApiErrorResponse: null
            };
        }),
        on(moviesEvents.moviesApiError, ({ payload: _moviesApiErrorResponse }) => {
            console.log(_moviesApiErrorResponse);

            return {
                _moviesApiErrorResponse,
                _moviesApiIsLoading: false,
                _moviesApiSuccessResponse: null
            }
        }),
        on(moviesEvents.moviesApiLoading, ({ payload: _moviesApiIsLoading }) => {
            return {
                _moviesApiIsLoading
            };
        })
    ),
    withEventHandlers((store) => ({
        loadMovies$: store.event.on(moviesEvents.loadMovies).pipe(
            tap(() => moviesEvents.moviesApiLoading(true)),
            switchMap(() => store.moviesService.fetchMoviesFromApi().pipe(
                map((response: MoviesAPIResponseI) => {
                    return moviesEvents.moviesApiSuccess(response)
                }),
                catchError((error: any) => {
                    return of(moviesEvents.moviesApiError(error));
                })
            ))
        )
    })),
    withComputed((store) => ({
        moviesApiSuccessResponse: computed(() => store._moviesApiSuccessResponse()),
        moviesApiErrorResponse: computed(() => store._moviesApiErrorResponse()),
        moviesApiIsLoading: computed(() => store._moviesApiIsLoading())
    }))
);