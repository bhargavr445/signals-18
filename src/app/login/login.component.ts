import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../commons/services/api/auth.service';
import { CommunicationService } from '../commons/services/communication/communication.service';
import { LoginResponseI } from './login-response-interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  loginApiCallProgress: boolean = false;
  communicationService = inject(CommunicationService);
  router = inject(Router);
  loginForm: FormGroup;

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
    this.loginApiCallProgress = true;
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (resp: LoginResponseI) => this.handleResponse(resp),
      error: (error) => this.loginApiCallProgress = false
    },
    )
  }

  handleResponse(resp: LoginResponseI) {
    const { userName, role } = resp.data.user;
    this.authService.updateUserProfile({ userName, role })
    sessionStorage.setItem('TOKEN', resp.data.token);
    this.router.navigate(['udemy'])
    this.loginApiCallProgress = false;
  }

}
