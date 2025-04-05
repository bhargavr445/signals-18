import { AsyncPipe, CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, ResourceRef, signal } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { UdemyService } from '../../commons/services/api/udemy.service';
import { CourseI, UpdatedCourseI } from '../interfaces/udemy-i';

@Component({
    selector: 'app-buy-courses',
    imports: [CurrencyPipe, AsyncPipe, TitleCasePipe],
    templateUrl: './buy-courses.component.html',
    styleUrl: './buy-courses.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BuyCoursesComponent {

  categoryClassMap = {
    'IT': 'IT',
    'Sports': 'Sports',
    'Music': 'Music',
    'Real Estate': 'real-estate'
  };

  paginatedRecords = signal<any[]>([]);

  #udemyService = inject(UdemyService);
  unpurchasedCourses$ = this.fetchCourses();
  // = rxResource({
  //   loader: () =>  this.fetchUnpurchasedCourses()
  // })
  selectedCourses: string[] = [];

  // constructor() {
  //   this.fetchUnpurchasedCourses();
  // }

  fetchCourses(): Observable<UpdatedCourseI[]> {    
    return this.#udemyService.fetchUnpurchasedCourses().pipe(map((response) => this.updatedCourseObjWithIsSelectProp(response.data)));
  }

  // fetchUnpurchasedCourses(): void {
  //   this.unpurchasedCourses = rxResource({
  //     loader: () => this.fetchCourses()
  //   })
  // }

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
    // this.unpurchasedCourses = rxResource({
    //   loader: () => this.#udemyService.purchaseCourses(this.selectedCourses).pipe(
    //     tap(() => this.selectedCourses = []),
    //     switchMap(() => this.fetchCourses())
    //   )
    // })

    this.unpurchasedCourses$ =this.#udemyService.purchaseCourses(this.selectedCourses).pipe(
      tap(() => {
        this.selectedCourses = [];
        this.paginatedRecords.set([]);
      }),
      switchMap(() => this.fetchCourses())
    )
    // .subscribe((courses: UpdatedCourseI[]) => {
    //   console.log(courses);
      
    //   // this.unpurchasedCourses.
    // })

  }

  updatedCourseObjWithIsSelectProp(coursesList: CourseI[]): UpdatedCourseI[] {
    return coursesList.map((course) => ({ ...course, isSelected: false }));
  }

  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as any[]);
  }

}
