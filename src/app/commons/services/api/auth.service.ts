import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponseI, User } from '../../../login/login-response-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  userProfileS = signal<User>(null);
  userProfileComputed = this.userProfileS.asReadonly()

  updateUserProfile(userProfile: User) {
    console.log();
    this.userProfileS.set(userProfile)
  }

  login(credentials: any): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('login', credentials)
  }

  logout() {
    return this.http.get<LoginResponseI>('logoutAll')
  }

}
