import { Injectable, signal } from '@angular/core';
import { U_ROLES } from '../../../udemy/interfaces/udemy-i';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // role = signal<U_ROLES>(null);
  // userName = signal<string>('');

  constructor() { }

  // setUserName(name: U_ROLES) {
  //   this.role.set(name);
  // }

  // getuserName() {
  //   return this.userName();
  // }

  // setUesrRole(role: U_ROLES) {
  //   this.role.set(role);
  // }

  // getUserRole(): U_ROLES {
  //   return this.role();
  // }
}
