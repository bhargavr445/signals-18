import { Component, inject } from '@angular/core';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'users-list',
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  usersListService = inject(UsersListService);

}
