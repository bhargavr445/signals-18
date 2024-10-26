import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, interval, map, zip } from 'rxjs';
import { ULabelComponent } from '../commons/components/u-label/u-label.component';
import { AuthService } from '../commons/services/api/auth.service';
import { CommunicationService } from '../commons/services/communication/communication.service';
import { LoginResponseI } from './login-response-interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ULabelComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  loginApiCallProgress = signal(false);
  communicationService = inject(CommunicationService);
  router = inject(Router);
  loginForm: FormGroup;

  // todoResource = resource({
  //   loader: () => this.authService.login({userName: '', password: ''})
  // });


  counter = signal(0);

  counter$ = toObservable(this.counter).pipe(map((val) => val*2));

  constructor() {
    this.createForm();
    // this.rxjsScenarios();
  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.loginApiCallProgress.set(true);
    this.authService.login(this.loginForm.getRawValue())
    .subscribe({
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

  rxjsScenarios() {
    const first$ = interval(1000).pipe(filter(d => !!d));
    const second$ = interval(2000).pipe(filter(d => !!d));
    const third$ = interval(3000).pipe(filter(d => !!d));

    zip(first$, second$, third$).pipe().subscribe(data => console.log(data));
  }


}
