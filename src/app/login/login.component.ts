import { Component, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, interval, map, Subject, takeUntil, zip } from 'rxjs';
import { RadioButtonsComponent } from '../commons/components/radio-buttons/radio-buttons.component';
import { ULabelComponent } from '../commons/components/u-label/u-label.component';
import { AuthService } from '../commons/services/api/auth.service';
import { CommunicationService } from '../commons/services/communication/communication.service';
import { LoginResponseI } from './login-response-interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ULabelComponent, RadioButtonsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  roles = [
    { label: 'Instructor', key: 'I' },
    { label: 'Student', key: 'S' }
  ];

  

  authService = inject(AuthService);
  loginApiCallProgress = signal(false);
  communicationService = inject(CommunicationService);
  router = inject(Router);
  loginForm: FormGroup;
  unsub = new Subject();
  stocks = toSignal(
    this.authService.getStockPrices().pipe(map((stockInfo) =>( {...this.stocks(), ...stockInfo}))),
    {initialValue: null}
  )

  // todoResource = resource({
  //   loader: () => this.authService.login({userName: '', password: ''})
  // });


  counter = signal(0);

  counter$ = toObservable(this.counter).pipe(map((val) => val*2));

  constructor() {
    this.createForm();
    // this.rxjsScenarios();
  }

  ngOnInit(): void {
    // this.authService.getStockPrices()
    // .pipe(takeUntil(this.unsub))
    // .subscribe(stocksInfo => {
    //   console.log(stocksInfo);
      
    //   this.stocks.update(preev =>  ({...preev, ...stocksInfo}))
    // })
    this.loginForm.get('role').valueChanges.subscribe(d => console.log(d));
  }

  createForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', 
        // [Validators.required]
      )
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

  get getRoleControl() {
    return this.loginForm.get('role') as FormControl;
  }


  getStocks1() {
    this.authService.getStockPrices()
    .pipe(takeUntil(this.unsub))
    .subscribe(stocksInfo => 
      this.stocks.update(preev =>  ({...preev, ...stocksInfo})))
      
    
  }




}

// main.js             | main                          |  28.80 kB | 
// styles.css          | styles                        |   3.63 kB | 
// chunk-RDNUWX3H.js   | -                             |   3.60 kB | 
// chunk-JH7DFIUV.js   | -                             |   1.96 kB | 
// chunk-LACGZ4NR.js   | -                             |   1.95 kB | 
// chunk-KK2JKVHH.js   | -                             |   1.74 kB | 
// chunk-AY3MJH7C.js   | -                             |   1.47 kB | 
// chunk-JHVNSDMN.js   | -                             |   1.43 kB | 
// chunk-A2AWFSPO.js   | -                             |   1.40 kB | 
// chunk-YNNGTGMQ.js   | -                             | 983 bytes | 
// chunk-VUJOFXKG.js   | -                             | 938 bytes | 
// chunk-TTQJLFAI.js   | -                             | 729 bytes | 

//                     | Initial total                 |  48.61 kB