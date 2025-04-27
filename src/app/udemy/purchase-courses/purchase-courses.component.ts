import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, signal } from '@angular/core';
import { TableSkeletonComponent } from '../../commons/components/table-skeleton/table-skeleton.component';
import { add } from '@bhargavr445/search-utilities';

@Component({
  selector: 'app-purchase-courses',
  imports: [CurrencyPipe, TableSkeletonComponent],
  templateUrl: './purchase-courses.component.html',
  styleUrl: './purchase-courses.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchaseCoursesComponent {

  data = add(10,20);

  constructor() {
    console.log(this.data);    
  }

  categoryClassMap = {
    'IT': 'IT',
    'Sports': 'Sports',
    'Music': 'Music',
    'Real Estate': 'real-estate'
  };

  paginatedRecords = signal<any[]>([]);
  fetchEnrolledCoursesResource = httpResource<{data: [], status: null}>(() => ({
    url: 'fetchEnrolledCourses'
  }));

  coursesList = computed(() => this.fetchEnrolledCoursesResource.value()); 
  coursesListLoading = computed(() => this.fetchEnrolledCoursesResource.isLoading()); 

  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as any[]);
  }

}
