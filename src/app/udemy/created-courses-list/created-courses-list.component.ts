import { CurrencyPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';

@Component({
    selector: 'created-courses-list',
    imports: [CurrencyPipe],
    templateUrl: './created-courses-list.component.html',
    styleUrl: './created-courses-list.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatedCoursesListComponent {
  categoryClassMap = {
    'IT': 'IT',
    'Sports': 'Sports',
    'Music': 'Music',
    'Real Estate': 'real-estate'
  };

  createdCoursesList = input.required<any[]>();
  paginatedRecords = signal<any[]>([]);


  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as any[]);
  }

}


