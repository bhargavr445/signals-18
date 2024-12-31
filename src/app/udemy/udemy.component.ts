import { Component, computed, inject, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../commons/services/api/auth.service';
import { NavMenuItem, U_ROLES } from './interfaces/udemy-i';

@Component({
    selector: 'app-udemy',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './udemy.component.html',
    styleUrl: './udemy.component.scss'
})

export class UdemyComponent {

  data1: Signal<number> = signal(1);
  readonly #authService = inject(AuthService);
  data = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  role = computed(() => this.#checkForInstructorRole(this.#authService.userProfileComputed()?.role));

  readonly #udemyMenu: NavMenuItem[] = [
    { label: 'Add Course', path: '/udemy/add', isActive: false, role: 'U_INSTRUCTOR' },
    { label: 'Buy Courses', path: '/udemy/buy', isActive: true },
    { label: 'Purchased Courses', path: '/udemy/purchase', isActive: false },
    { label: 'Update Profile', path: '/udemy/update', isActive: false }
  ];

  #checkForInstructorRole(role: U_ROLES): NavMenuItem[] {
    return this.#udemyMenu.filter((menu: NavMenuItem) => menu?.role ? this.#checkIfRoleIsMatching(menu, role) : true)
  }

  #checkIfRoleIsMatching(menu: NavMenuItem, role: U_ROLES): boolean {
    return menu.role == role;
  }

}
