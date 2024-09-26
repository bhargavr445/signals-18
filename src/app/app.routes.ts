import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { CartService } from './commons/services/communication/cart.service';
import { ModalService } from './commons/services/api/modal.service';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'vehicle', loadChildren: () => import('./Vehicle/vehicle.routing') },
    { path: 'udemy', loadChildren: () => import('./udemy/udemy.routing') },
    { path: 'student', loadComponent: () => import('./student-overview/student-overview.component').then(c => c.StudentOverviewComponent) },
    { path: 'cart', loadComponent: () => import('./Vehicle/Components/cart/cart.component').then(c => c.CartComponent), canActivate: [() => checkCartItemsLength(), () => checkUserRole()] },
    { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
    // {path: 'home', component: HomeComponent},
    { path: 'store', loadComponent: () => import('./store/store.component').then(c => c.StoreComponent) },
    { path: 'universities', loadComponent: () => import('./university/university-overview.component').then(c => c.UniversityOverviewComponent) },
    { path: 'game', loadComponent: () => import('./game/game.component').then(c => c.GameComponent) },
    { path: 'population', loadComponent: () => import('./population/population.component').then(c => c.PopulationComponent) },
    { path: 'movies', loadComponent: () => import('./movies/movies.component').then(c => c.MoviesComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
];

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

// Initial total                 | 159.13 kB
// | Initial total                 | 169.66 kB