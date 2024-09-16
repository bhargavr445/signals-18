import { Component, inject } from '@angular/core';
import { UdemyService } from '../../commons/services/api/udemy.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CourseI, UpdatedCourseI } from '../interfaces/udemy-i';

@Component({
  selector: 'app-buy-courses',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './buy-courses.component.html',
  styleUrl: './buy-courses.component.scss'
})
export class BuyCoursesComponent {

  udemyService = inject(UdemyService);
  UnpurchasedCourses$: Observable<UpdatedCourseI[]>;
  selectedCourses: string[] = [];

  constructor() {
    this.fetchUnpurchasedCourses();
  }

  fetchCourses(): Observable<UpdatedCourseI[]> {
    return this.udemyService.fetchUnpurchasedCourses().pipe(map((response) => this.updatedCourseObjWithIsSelectProp(response.data)));
  }

  fetchUnpurchasedCourses(): void {
    this.UnpurchasedCourses$ = this.fetchCourses();
  }

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
    this.UnpurchasedCourses$ = this.udemyService.purchaseCourses(this.selectedCourses).pipe(
      tap(() => this.selectedCourses = []),
      switchMap(() => this.fetchCourses())
    )
  }

  updatedCourseObjWithIsSelectProp(coursesList: CourseI[]): UpdatedCourseI[] {
    return coursesList.map((course) => ({ ...course, isSelected: false }));
  }

}
