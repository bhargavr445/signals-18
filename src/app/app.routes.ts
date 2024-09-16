import { Routes } from '@angular/router';
import { VehicleOverviewComponent } from './Vehicle/Components/vehicle-overview/vehicle-overview.component';
import { inject } from '@angular/core';
import { CartService } from './commons/services/communication/cart.service';
import { StudentOverviewComponent } from './student-overview/student-overview.component';
import { StoreComponent } from './store/store.component';
import { UniversityOverviewComponent } from './university/university-overview.component';
import { GameComponent } from './game/game.component';
import { PopulationComponent } from './population/population.component';
import { MoviesComponent } from './movies/movies.component';
import { ModalService } from './commons/services/api/modal.service';
import { BuyCoursesComponent } from './udemy/buy-courses/buy-courses.component';
import { CreateCourseComponent } from './udemy/create-course/create-course.component';
import { PurchaseCoursesComponent } from './udemy/purchase-courses/purchase-courses.component';
import { UpdateProfileComponent } from './udemy/update-profile/update-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'vehicle', loadChildren: () => import('./Vehicle/vehicle.routing').then((r) => r.VEHICLE_ROUTES) },
    // { path: 'udemy', loadChildren: () => import('./udemy/udemy.routing').then((r) => r.UDEMY_ROUTES) },
    {
        path: 'udemy', loadComponent: () => import('./udemy/udemy.component').then((c) => c.UdemyComponent),
        children: [
            { path: '', redirectTo: 'buy', pathMatch: 'full' },
            { path: 'buy', component: BuyCoursesComponent },
            { path: 'add', component: CreateCourseComponent },
            { path: 'purchase', component: PurchaseCoursesComponent },
            { path: 'update', component: UpdateProfileComponent },
        ]
    },
    { path: 'student', loadComponent: () => import('./student-overview/student-overview.component').then(c => c.StudentOverviewComponent) },
    { path: 'cart', loadComponent: () => import('./Vehicle/Components/cart/cart.component').then(c => c.CartComponent), canActivate: [() => checkCartItemsLength(), () => checkUserRole()] },
    { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
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