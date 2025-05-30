import { AsyncPipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CourseI, UpdatedCourseI } from '../interfaces/udemy-i';
import { Buy } from './buy';
import { TableSkeletonComponent } from '../../commons/components/table-skeleton/table-skeleton.component';

@Component({
  selector: 'app-buy-courses',
  imports: [CurrencyPipe, TitleCasePipe, AsyncPipe, TableSkeletonComponent],
  templateUrl: './buy-courses.component.html',
  styleUrl: './buy-courses.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Buy]
})
export class BuyCoursesComponent implements OnDestroy {

  categoryClassMap = {
    'U_IT': 'IT',
    'U_SPORTS': 'Sports',
    'U_MUSIC': 'Music',
    'U_REAL_ESTATE': 'real-estate'
  };
  #udemyService = inject(Buy);

  paginatedRecords = signal<any[]>([]);
  purchaseCourseApiStatus$: Observable<any> = of();

  unpurchasedCourses = this.#udemyService.fetchUnpurchasedCoursesResource;
  updatedUnpurchasedCourses = computed(() => this.updatedCourseObjWithIsSelectProp(this.unpurchasedCourses.value()?.data));
  unpurchasedCoursesListLoading = computed(() => this.unpurchasedCourses.isLoading());
  selectedCourses: string[] = [];


  onToggleCheckbox(event, course_id: string): void {
    event.target.checked ? this.addIdToList(course_id) : this.removeIdFromList(course_id)
  }

  addIdToList(course_id: string): void {
    this.selectedCourses.push(course_id);
  }

  removeIdFromList(course_id: string): void {
    const index = this.selectedCourses.indexOf(course_id)
    if (index > -1) {
      this.selectedCourses.splice(index, 1);
    }
  }

  buyCourses(): void {
    this.purchaseCourseApiStatus$ = this.#udemyService.purchaseCourses(this.selectedCourses).pipe(
      tap(() => {
        this.selectedCourses = [];
        this.paginatedRecords.set([]);
        this.#udemyService.reloadUnpurchasedCoursesResource();
      }),
      map(() => 'Sleceted course(s) succesfully created.')
    )
  }

  updatedCourseObjWithIsSelectProp(coursesList: CourseI[]): UpdatedCourseI[] {
    console.log('COURSES 🔴 🔴', coursesList);
    return coursesList?.map((course) => ({ ...course, isSelected: false }));
  }

  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as any[]);
  }

  ngOnDestroy(): void {
    this.unpurchasedCourses.destroy();
  }

}
