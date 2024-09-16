import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'created-courses-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './created-courses-list.component.html',
  styleUrl: './created-courses-list.component.scss'
})
export class CreatedCoursesListComponent {

  createdCoursesList = input.required<any[]>();

}
