import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccountTypeResponseI, CategorysResponseI } from '../interfaces/udemy-i';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UdemyService {

  http = inject(HttpClient);

  fetchCategorys(): Observable<CategorysResponseI> {
    return this.http.get<CategorysResponseI>('http://localhost:3010/api/categories');
  }

  fetchAccountTypes(): Observable<AccountTypeResponseI> {
    return this.http.get<AccountTypeResponseI>('http://localhost:3010/api/accountTypes');
  }

  createCourse(course: any) {
    return this.http.post<any>('http://localhost:3010/api/createCourse', course);
  }

  checkIfIdExists(id): Observable<boolean> {
    return this.http.get<{data: boolean, status: number}>(`http://localhost:3010/api/checkIdExists/${id}`).pipe(map((resp) => resp.data));
  }
  
}
