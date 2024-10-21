import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../commons/services/api/auth.service';
import { CommunicationService } from '../commons/services/communication/communication.service';
import { LoginResponseI } from './login-response-interface';
import { ULabelComponent } from '../commons/components/u-label/u-label.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ULabelComponent, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  loginApiCallProgress = signal(false);
  communicationService = inject(CommunicationService);
  router = inject(Router);
  loginForm: FormGroup;


  counter = signal(0);

  counter$ = toObservable(this.counter).pipe(map((val) => val*2));

  constructor() {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.loginApiCallProgress.set(true);
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (resp: LoginResponseI) => this.handleResponse(resp),
      error: (error) => this.loginApiCallProgress.set(false),
      complete: () => {}
    },
    )
  }

  handleResponse(resp: LoginResponseI) {
    const { userName, role } = resp.data.user;
    this.authService.updateUserProfile({ userName, role })
    sessionStorage.setItem('TOKEN', resp.data.token);
    this.router.navigate(['udemy'])
    this.loginApiCallProgress.set(false);
  }

  incr() {
    this.counter.update((prevCounter) => prevCounter+1);
  }

}
