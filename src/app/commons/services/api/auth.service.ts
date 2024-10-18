import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponseI, User } from '../../../login/login-response-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  userProfileS = signal<User>(null);
  userProfileComputed = this.userProfileS.asReadonly();

  userProfileSub = new BehaviorSubject<User>(null);
  userProfileSub$ = this.userProfileSub.asObservable();

  updateUserProfile(userProfile: User) {
    console.log();
    this.userProfileS.set(userProfile);
    this.userProfileSub.next(userProfile);
  }

  login(credentials: any): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('login', credentials)
  }

  logout() {
    return this.http.get<LoginResponseI>('logoutAll')
  }

}
