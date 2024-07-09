import { Routes } from '@angular/router';
import { VehicleOverviewComponent } from './Vehicle/Components/vehicle-overview/vehicle-overview.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './Vehicle/Components/cart/cart.component';
import { inject } from '@angular/core';
import { CartService } from './Vehicle/Services/cart.service';
import { ModalService } from './commons/services/modal.service';
import { StudentOverviewComponent } from './student-overview/student-overview.component';
import { StoreComponent } from './store/store.component';

export const routes: Routes = [
    { path: '', redirectTo: 'vehicle', pathMatch: 'full' },
    { path: 'vehicle', loadChildren: () => import('./Vehicle/vehicle.routing').then((r) => r.VEHICLE_ROUTES) },
    { path: 'student', component: StudentOverviewComponent },
    { path: 'cart', component: CartComponent, canActivate: [() => checkCartItemsLength()] },
    { path: 'home', component: HomeComponent },
    { path: 'store', component: StoreComponent },
];

function checkCartItemsLength(): boolean {
    let cartService = inject(CartService);
    let modalService = inject(ModalService);
    if (cartService.vehicleCartSignal().length < 1) {
        const compRef = modalService.dynamicComponentOnDOM();
        compRef.openModal({
            content: 'Add items to cart to access this page.',
            // primaryButton: 'Cancel',
            secondaryButton: 'Confirm',
            headerLabel: 'Confirmation',
            toggleStatus: 'o'
        });

        compRef.closeEvent.subscribe();
        return false

    } else {
        return true;
    }
}