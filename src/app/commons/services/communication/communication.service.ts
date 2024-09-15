import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  role = signal<string>('');
  userName = signal<string>('');
  // roleC = this.role.asReadonly()

  constructor() { }

  setUserName(name: string) {
    this.role.set(name);
  }

  getuserName() {
    return this.userName();
  }

  setUesrRole(role: string) {
    this.role.set(role);
  }

  getUserRole() {
    return this.role();
  }
}
