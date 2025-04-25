import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UnEnrolledCourseApiResponseI } from '../interfaces/udemy-i';

@Injectable()
export class Buy {

  #http = inject(HttpClient);

  fetchUnpurchasedCoursesResource: HttpResourceRef<UnEnrolledCourseApiResponseI> = httpResource<UnEnrolledCourseApiResponseI>(() => ({
    url: 'unEnrolledCourses',
  }), 
  {
    defaultValue: {data: [], status: null}
  })

  reloadUnpurchasedCoursesResource() {
    this.fetchUnpurchasedCoursesResource.reload();
  }

  purchaseCourses(coursesList: string[]) {
    return this.#http.post<UnEnrolledCourseApiResponseI>('purchaseNewCourses', coursesList);
  }

}
