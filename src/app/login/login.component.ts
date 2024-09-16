import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponseI } from './login-response-interface';
import { CommunicationService } from '../commons/services/communication/communication.service';
import { AuthService } from '../commons/services/api/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  communicationService = inject(CommunicationService);
  router = inject(Router);


  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  login() {
    console.log(this.loginForm.getRawValue());
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (resp: LoginResponseI) => {
        console.log(resp);
        const { userName, role } = resp.data.user
        this.communicationService.setUesrRole(role);
        localStorage.setItem('TOKEN', resp.data.token);
        this.router.navigate(['udemy'])
      },
      error: (error) => {
        console.log(error);
      }
    },
    )
  }

}
