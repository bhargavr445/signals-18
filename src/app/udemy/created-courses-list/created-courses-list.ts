import { CurrencyPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';

@Component({
    selector: 'created-courses-list',
    imports: [CurrencyPipe],
    templateUrl: './created-courses-list.html',
    styleUrl: './created-courses-list.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatedCoursesList {

  createdCoursesList = input.required<any[]>();
  paginatedRecords = signal<any[]>([]);


  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as any[]);
  }

}
