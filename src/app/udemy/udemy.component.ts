import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommunicationService } from '../commons/services/communication/communication.service';
import { CreateCourseComponent } from './create-course/create-course.component';
import { NavMenuItem, U_ROLES } from './interfaces/udemy-i';



@Component({
  selector: 'app-udemy',
  standalone: true,
  imports: [CreateCourseComponent, RouterOutlet, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './udemy.component.html',
  styleUrl: './udemy.component.scss'
})

export class UdemyComponent {

  #communicationService = inject(CommunicationService);

  role = computed(() => this.#checkForInstructorRole(this.#communicationService.getUserRole()));

  #udemyMenu: NavMenuItem[] = [
    { label: 'Buy Courses', path: '/udemy/buy', isActive: true },
    { label: 'Purchased Courses', path: '/udemy/purchase', isActive: false },
    { label: 'Add Course', path: '/udemy/add', isActive: false, role: 'U_INSTRUCTOR' },
    { label: 'Update Profile', path: '/udemy/update', isActive: false }
  ];

  #checkForInstructorRole(role: U_ROLES): NavMenuItem[] {
    return this.#udemyMenu.filter((menu: NavMenuItem) => !!menu?.role ? this.#checkIfRoleIsMatching(menu, role) : true)
  }

  #checkIfRoleIsMatching(menu: NavMenuItem, role: U_ROLES): boolean {
    return menu.role == role;
  }

}
