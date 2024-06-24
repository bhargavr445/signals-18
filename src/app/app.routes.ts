import { Routes } from '@angular/router';
import { Ang18Component } from './Vehicle/Components/vehicle-overview/vehicle-overview.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './Vehicle/Components/cart/cart.component';
import { inject } from '@angular/core';
import { CartService } from './Vehicle/Services/cart.service';
import { AuthService } from './auth.service';

export const routes: Routes = [
    { path: '', redirectTo: 'vehicle', pathMatch: 'full' },
    { path: 'vehicle', component: Ang18Component },
    { path: 'cart', component: CartComponent, canActivate: [() => checkCartItemsLength()] },
    { path: 'home', component: HomeComponent },
];

function checkCartItemsLength(): boolean {
    let cartService = inject(CartService);
    let authService = inject(AuthService);
    // authService.setSignal(cartService.vehicleCartSignal().length < 1)
    return cartService.vehicleCartSignal().length > 0;
}