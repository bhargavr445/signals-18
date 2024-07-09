import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../Vehicle/Services/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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

  cartService = inject(CartService);
  router = inject(Router);
  noOfItemsInCart = computed(() =>  this.cartService.vehicleCartSignal().length);
  showCartItemsTable = signal<boolean>(false);
  iscartUrl = signal<boolean>(false);
  navItems = signal<NavI[]>([
    { label: 'Home', navigationUrl: '/home', isActive: false },
    { label: 'Vehicle', navigationUrl: '/vehicle', isActive: true },
    { label: 'student', navigationUrl: '/student', isActive: false },
    { label: 'Store', navigationUrl: '/store', isActive: false },
  ]);

  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => this.checkForActiveRoute(event.url));
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
