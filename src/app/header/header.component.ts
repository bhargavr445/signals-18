import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../Vehicle/Services/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NgClass } from '@angular/common';

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
  noOfItemsInCart = computed(() => {
    return this.cartService.vehicleCartSignal().length
  });
  showCartItemsTable = signal<boolean>(false);
  iscartUrl = signal<boolean>(false);
  navItems = signal([
    { label: 'Home', navigationUrl: '/home', isActive: false },
    { label: 'Vehicle', navigationUrl: '/vehicle', isActive: true },
    { label: 'student', navigationUrl: '/student', isActive: false },
  ]);

  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => this.checkForActiveRoute(event.url));
  }

  checkForActiveRoute(currentUrl: string) {
    this.iscartUrl.set(currentUrl == '/cart');    
    this.navItems.update((navItemList) => {
     const updatedNavItems = navItemList.map((item) => {
        if(item.navigationUrl === currentUrl) {
          return {...item, isActive: true}
        }
        return {...item, isActive: false}
      })
      return updatedNavItems;
    })
  }

  showCartItems() {
    this.showCartItemsTable.set(true);
  }

  hideCartItems() {
    this.showCartItemsTable.set(false);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
