import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, first, Observable, take } from 'rxjs';
import { LoginResponseI, User } from '../../../login/login-response-interface';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private socket$: WebSocketSubject<any>;

  http = inject(HttpClient);

  userProfileS = signal<User>(null);
  userProfileComputed = this.userProfileS.asReadonly();

  userProfileSub = new BehaviorSubject<User>(null);
  userProfileSub$ = this.userProfileSub.asObservable();

  constructor() {
    this.socket$ = webSocket('wss://ws.coincap.io/prices?assets=ethereum,bitcoin,dogecoin');
  }

  updateUserProfile(userProfile: User) {
    console.log();
    this.userProfileS.set(userProfile);
    this.userProfileSub.next(userProfile);
  }

  login(credentials: any): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('login', credentials);
  }

  logout() {
    return this.http.get<LoginResponseI>('logoutAll')
  }

  getStockPrices() {
    return this.socket$.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
  }


}
