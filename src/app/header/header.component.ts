import { NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../commons/services/api/auth.service';
import { CommonSignalStore } from '../commons/common-signal-store/store';

interface NavI {
  label: string;
  navigationUrl: string;
}

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, RouterLinkActive, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  commonSignalStore = inject(CommonSignalStore);

  showCartItemsTable = signal<boolean>(false);
  iscartUrl = signal<boolean>(false);
  
  navItems = signal<NavI[]>([
    { label: 'Home', navigationUrl: '/home' },
    { label: 'Game', navigationUrl: '/game' },
    { label: 'Vehicle', navigationUrl: '/vehicle' },
    { label: 'Student', navigationUrl: '/student' },
    { label: 'Store', navigationUrl: '/store' },
    { label: 'Universities', navigationUrl: '/universities' },
    { label: 'Population', navigationUrl: '/population' },
    { label: 'Movies', navigationUrl: '/movies' },
    { label: 'Udemy', navigationUrl: '/udemy' },
    { label: 'Elections', navigationUrl: '/elections' },
  ]);

  #authService = inject(AuthService);
  #router = inject(Router);

  userProfileInfo = computed(() => {
    this.checkIfuserInfoExists(this.#authService.userProfileS());
    return this.#authService.userProfileS()
  });

  checkIfuserInfoExists(userInfo) {
    if (!userInfo) {
      this.navigateTo('login');
    }
  }

  navigateTo(url: string): void {
    this.#router.navigate([url]);
  }

  logout() {
    this.#authService.updateUserProfile(null)
    sessionStorage.clear();
    this.navigateTo('login')
  }

  getUser() {
    console.log('trigger....');
    return 'Bhargav'
  }

}
