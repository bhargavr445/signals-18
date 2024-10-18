import { JsonPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../commons/services/api/auth.service';
import { CartService } from '../commons/services/communication/cart.service';
import { CommunicationService } from '../commons/services/communication/communication.service';

interface NavI {
  label: string;
  navigationUrl: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, JsonPipe, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showCartItemsTable = signal<boolean>(false);
  iscartUrl = signal<boolean>(false);
  navItems = signal<NavI[]>([
    { label: 'Home', navigationUrl: '/home' },
    { label: 'Vehicle', navigationUrl: '/vehicle' },
    { label: 'Student', navigationUrl: '/student' },
    { label: 'Store', navigationUrl: '/store' },
    { label: 'Universities', navigationUrl: '/universities' },
    { label: 'Game', navigationUrl: '/game' },
    { label: 'Population', navigationUrl: '/population' },
    { label: 'Movies', navigationUrl: '/movies' },
    { label: 'Udemy', navigationUrl: '/udemy' }
  ]);

  authService = inject(AuthService);
  communicationService = inject(CommunicationService);
  cartService = inject(CartService);
  router = inject(Router);

  userProfileInfo = computed(() => {
    this.checkIfuserInfoExists(this.authService.userProfileS());
    return this.authService.userProfileS()
  });
  noOfItemsInCart = computed(() => this.cartService.vehicleCartReadonlySignal().length);

  checkIfuserInfoExists(userInfo) {
    if (!userInfo) {
      this.navigateTo('login');
    }
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  logout() {
    this.authService.updateUserProfile(null)
    sessionStorage.clear();
    this.navigateTo('login')
  }

}
