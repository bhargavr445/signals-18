import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { CreateCourseComponent } from './create-course/create-course.component';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, tap } from 'rxjs';
import { NgClass } from '@angular/common';
import { CommunicationService } from '../commons/services/communication/communication.service';

@Component({
  selector: 'app-udemy',
  standalone: true,
  imports: [CreateCourseComponent, RouterOutlet, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './udemy.component.html',
  styleUrl: './udemy.component.scss'
})
export class UdemyComponent implements OnInit {

  communicationService = inject(CommunicationService);
  matchingUrl = 'buy';

  role = computed(() => this.communicationService.getUserRole());

  router = inject(Router);
  udemyMenu = [
    { label: 'Buy Courses', path: '/udemy/buy', isActive: true  },
    { label: 'Purchased Courses', path: '/udemy/purchase', isActive: false  },
    { label: 'Add Course', path: '/udemy/add', isActive: false },
    { label: 'Update Profile', path: '/udemy/update', isActive: false }
  ];

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      tap(() => console.log('me')),
    ).subscribe((data: NavigationEnd) => this.setActiveUrl(data.url));
  }

  setActiveUrl(url: string) {
    this.matchingUrl = url.split('/')[2]
    
    this.udemyMenu = this.udemyMenu.map((item) => ({ ...item, isActive: url.includes(item.path) }));
    console.log(this.udemyMenu); 
  }

  navigteTo(path: string) {
    this.router.navigate([`udemy/${path}`]);
  }

}
