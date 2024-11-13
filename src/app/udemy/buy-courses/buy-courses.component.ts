import { CurrencyPipe } from '@angular/common';
import { Component, inject, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, Observable, switchMap, tap } from 'rxjs';
import { UdemyService } from '../../commons/services/api/udemy.service';
import { CourseI, UpdatedCourseI } from '../interfaces/udemy-i';

@Component({
  selector: 'app-buy-courses',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './buy-courses.component.html',
  styleUrl: './buy-courses.component.scss'
})
export class BuyCoursesComponent {

  #udemyService = inject(UdemyService);
  unpurchasedCourses: ResourceRef<UpdatedCourseI[]>;
  // = rxResource({
  //   loader: () =>  this.fetchUnpurchasedCourses()
  // })
  selectedCourses: string[] = [];

  constructor() {
    this.fetchUnpurchasedCourses();
  }

  fetchCourses(): Observable<UpdatedCourseI[]> {
    return this.#udemyService.fetchUnpurchasedCourses().pipe(map((response) => this.updatedCourseObjWithIsSelectProp(response.data)));
  }

  fetchUnpurchasedCourses(): void {
    this.unpurchasedCourses = rxResource({
      loader: () => this.fetchCourses()
    })
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
    this.unpurchasedCourses = rxResource({
      loader: () => this.#udemyService.purchaseCourses(this.selectedCourses).pipe(
        tap(() => this.selectedCourses = []),
        switchMap(() => this.fetchCourses())
      )
    })
  }

  updatedCourseObjWithIsSelectProp(coursesList: CourseI[]): UpdatedCourseI[] {
    return coursesList.map((course) => ({ ...course, isSelected: false }));
  }

}
