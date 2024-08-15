import { Component, Signal, computed, effect, inject, signal } from '@angular/core';
import { CartService } from '../Vehicle/Services/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, findIndex, tap } from 'rxjs';
import { JsonPipe, NgClass } from '@angular/common';
import { AuthService } from '../auth.service';

interface NavI {
  label: string;
  navigationUrl: string;
  isActive: boolean;
  display: boolean
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, JsonPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authService = inject(AuthService);
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

  constructor() {

    effect(() => {
      console.log(this.userProfileInfo())
      if (this.userProfileInfo()) {
        let index = this.navItems().findIndex((nav) => nav.label.toLocaleLowerCase() === 'login');
        console.log(index);
        this.navItems()[index].display = false
      }
    })

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
