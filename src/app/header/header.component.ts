import { JsonPipe, NgClass } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../commons/services/api/auth.service';
import { CartService } from '../commons/services/communication/cart.service';
import { CommunicationService } from '../commons/services/communication/communication.service';

interface NavI {
  label: string;
  navigationUrl: string;
  isActive: boolean;
  display: boolean
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, JsonPipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authService = inject(AuthService);
  communicationService = inject(CommunicationService);
  userProfileInfo = computed(() => this.authService.userProfileS());


  nv = [
    { label: 'Home', navigationUrl: '/home', isActive: false, rn: () => this.#navIt() },
    { label: 'Vehicle', navigationUrl: '/vehicle', isActive: true }
  ]

  #navIt() {

  }

  cartService = inject(CartService);
  router = inject(Router);
  noOfItemsInCart = computed(() =>  this.cartService.vehicleCartReadonlySignal().length);
  showCartItemsTable = signal<boolean>(false);
  iscartUrl = signal<boolean>(false);
  defaultRoute = '/home'
  navItems = signal<NavI[]>([
    { label: 'Home', navigationUrl: '/home', isActive: false, display: true },
    { label: 'Vehicle', navigationUrl: '/vehicle', isActive: false, display: true },
    { label: 'student', navigationUrl: '/student', isActive: false, display: true },
    { label: 'Store', navigationUrl: '/store', isActive: false, display: true },
    { label: 'Universities', navigationUrl: '/universities', isActive: false, display: true },
    { label: 'Game', navigationUrl: '/game', isActive: false, display: true },
    { label: 'Population', navigationUrl: '/population', isActive: false, display: true },
    { label: 'Movies', navigationUrl: '/movies', isActive: false, display: true },
    { label: 'Udemy', navigationUrl: '/udemy', isActive: false, display: true },
    { label: 'Login', navigationUrl: '/login', isActive: false, display: true },
  ]);


  showCartItems(): void {
    this.showCartItemsTable.set(true);
  }

  hideCartItems(): void {
    this.showCartItemsTable.set(false);
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }


}
