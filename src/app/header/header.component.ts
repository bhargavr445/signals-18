import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../Vehicle/Services/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { NgClass } from '@angular/common';

interface NavI {
  label: string;
  navigationUrl: string;
  isActive: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

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
    { label: 'Home', navigationUrl: '/home', isActive: false },
    { label: 'Vehicle', navigationUrl: '/vehicle', isActive: true },
    { label: 'student', navigationUrl: '/student', isActive: false },
    { label: 'Store', navigationUrl: '/store', isActive: false },
    { label: 'Universities', navigationUrl: '/universities', isActive: false },
    { label: 'Game', navigationUrl: '/game', isActive: false },
    { label: 'Population', navigationUrl: '/population', isActive: false },
    { label: 'Movies', navigationUrl: '/movies', isActive: false },
  ]);

  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => this.checkForActiveRoute(event?.url === '/' ? this.defaultRoute : event.url));
  }

  checkForActiveRoute(currentUrl: string): void {
    this.iscartUrl.set(currentUrl == '/cart');
    this.navItems.update((navItemList) => navItemList.map((item: NavI) => ({ ...item, isActive: currentUrl.includes(item.navigationUrl) })));
  }

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
