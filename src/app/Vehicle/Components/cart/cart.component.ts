import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Result } from '../../Models/VehiclesI';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles-table',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartService = inject(CartService);
  router = inject(Router)
  cartItems = computed(() => {
    console.log('table component computed function executes on cart signal update...');
    return this.cartService.vehicleCartSignal()
  });

  removeFromCart(item: Result) {
    this.cartService.removeitemFromCart(item.customId)
  }

  navigateToVehicles() {
    this.router.navigate(['vehicle'])
  }

}
