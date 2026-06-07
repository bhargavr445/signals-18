import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'users-list',
  imports: [],
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  usersListService = inject(UsersListService);

}
