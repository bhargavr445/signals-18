import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ModalService } from './commons/services/api/modal.service';
import { CartService } from './commons/services/communication/cart.service';
import { UdemyEffects } from './udemy/store/udemy.effects';
import { udemyReducer } from './udemy/store/udemy.reducer';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { VehicleComponent } from './Vehicle/vehicle.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // { path: 'game', component: GameComponent },
    // { path: 'vehicle', component: VehicleComponent },
    { path: 'vehicle', loadChildren: () => import('./Vehicle/vehicle.routing') },
    { path: 'game', loadComponent: () => import('./game/game.component').then(c => c.GameComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },

]
    // {
    //     path: 'udemy',
    //     loadChildren: () => import('./udemy/udemy.routing'),
    //     providers: [
    //         provideState('udemy', udemyReducer),
    //         provideEffects(UdemyEffects)
    //     ]
    // },
    // { path: 'student', loadComponent: () => import('./student-overview/student-overview.component').then(c => c.StudentOverviewComponent) },
    // {
    //     path: 'cart', loadComponent: () => import('./Vehicle/Components/cart/cart.component').then(c => c.CartComponent),
    //     canActivate: [() => checkCartItemsLength(), () => checkUserRole()]
    // },
    // { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    // { path: 'store', loadComponent: () => import('./store/store.component').then(c => c.StoreComponent) },
    // { path: 'universities', loadComponent: () => import('./university/university-overview.component').then(c => c.UniversityOverviewComponent) },
    // { path: 'population', loadComponent: () => import('./population/population.component').then(c => c.PopulationComponent) },
    // { path: 'movies', loadComponent: () => import('./movies/movies.component').then(c => c.MoviesComponent) },
    // { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
// ];

function checkUserRole(): boolean {
    return true
}

function checkCartItemsLength(): boolean {
    let cartService = inject(CartService);
    let modalService = inject(ModalService);
    if (cartService.vehicleCartReadonlySignal().length < 1) {
        const compRef = modalService.dynamicComponentOnDOM();
        compRef.openModal({
            content: 'Add items to cart to access this page.',
            // primaryButton: 'Cancel',
            secondaryButton: 'Confirm',
            headerLabel: 'Confirmation',
            toggleStatus: 'o'
        });

        compRef.closeEvent.subscribe();
        return false;

    } else {
        return true;
    }
}
