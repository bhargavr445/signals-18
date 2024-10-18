import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccountTypeResponseI, CategorysResponseI, CreateAPIRespI, CreateCoursePayloadI, FetchAllCoursesI, UnEnrolledCourseApiResponseI } from '../../../udemy/interfaces/udemy-i';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UdemyService {

  http = inject(HttpClient);

  fetchCategorys(): Observable<CategorysResponseI> {
    return this.http.get<CategorysResponseI>('categories');
  }

  fetchAccountTypes(): Observable<AccountTypeResponseI> {
    return this.http.get<AccountTypeResponseI>('accountTypes');
  }

  createCourse(course: CreateCoursePayloadI): Observable<boolean> {
    return this.http.post<CreateAPIRespI>('createCourse', course).pipe(map((resp)=> resp.data.n ==1 && resp.data.ok ==1));
  }

  checkIfIdExists(id): Observable<boolean> {
    return this.http.get<{data: boolean, status: number}>(`checkIdExists/${id}`).pipe(map((resp) => resp.data));
  }

  getEnrolledCourses() {
    return this.http.get<any>(`fetchEnrolledCourses`);
  }

  fetchAllCreatedCourses(): Observable<FetchAllCoursesI> {
    return this.http.get<FetchAllCoursesI>('fetchCreatedCourses');
  }

  fetchUnpurchasedCourses(): Observable<UnEnrolledCourseApiResponseI> {
    return this.http.get<UnEnrolledCourseApiResponseI>('unEnrolledCourses');
  }

  purchaseCourses(coursesList: string[]) {
    return this.http.post<UnEnrolledCourseApiResponseI>('purchaseNewCourses', coursesList);
  }
  
}


