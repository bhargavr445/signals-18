import { Component, inject, OnInit, signal } from '@angular/core';
import { form, required, validate } from '@angular/forms/signals';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, interval, map, of, Subject, takeUntil, zip } from 'rxjs';
import { AuthService } from '../commons/services/api/auth.service';
import { LoginResponseI } from './login-response-interface';
import { NgStyle } from '@angular/common';
import { SignalFormsComponent } from '../signal-forms/signal-forms.component';
import { SignalFormArrayComponent } from "./signal-form-array/signal-form-array.component";
import { AppHighlightDirective } from "../app-highlight.directive";

interface LoginForm {
  userName: string;
  password: string;
}
@Component({
    selector: 'app-login',
    imports: [FormsModule, ReactiveFormsModule, NgStyle, SignalFormArrayComponent, SignalFormsComponent, AppHighlightDirective],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  status = signal(true)
  
  private buttonClick$ = new Subject<void>();

  uinivResp: any = null;

  rawForm = signal<LoginForm>({
    userName: '',
    password: ''
  })

  authServvice = inject(AuthService);

  signalLoginForm = form(this.rawForm, (controls) => {
    required(controls.userName),
      // validate(controls.userName, ({value, valueOf}) => {
      //   return valueOf(controls.userName) ? undefined : { 'msg': '' }
      // }),
    required(controls.password)
  });


  cricketScore = signal({
    score: 0,
    wickets: 0,
    overs: 0
  });

  data = [
  { id: 1, code: 'A1', name: 'Item 1' },
  { id: 2, code: 'B1', name: 'Item 2' },
  { id: 3, code: 'A1', name: 'Item 3' },
  { id: 4, code: 'C1', name: 'Item 4' },
  { id: 5, code: 'B1', name: 'Item 5' }
];


constructor() {
  console.log(this.signalLoginForm());
  console.log(this.signalLoginForm().value());
  this.fetchUni()
  const countObj = {};
  this.data.forEach((data) => {
    const cd = data.code;

    if(countObj.hasOwnProperty(data.code)) {
      countObj[cd] = countObj[cd]+1;
    } else {
      countObj[cd] = 1;
    }
  })
  console.log(countObj);
  
}

  fetchUni() {
    this.authServvice.getUni().subscribe(
      (resp) => {
        
        this.uinivResp = resp
      },
      (error) => {

      }
    )
  }

  roles = [
    { label: 'Instructor', key: 'I' },
    { label: 'Student', key: 'S' }
  ];

  

  #authService = inject(AuthService);
  loginApiCallProgress = signal(false);
  #router = inject(Router);
  loginForm: FormGroup;
  unsub = new Subject();
  counter = signal(0);
  counter$ = toObservable(this.counter).pipe(map((val) => val*2));
  // stocks = toSignal(
    // this.#authService.getStockPrices().pipe(map((stockInfo) =>( {...this.stocks(), ...stockInfo}))),
    // {initialValue: null}
  // )

  name = 'Bhargav';
  updN() {
    this.name = 'Bhargav R G';
  }


  data$ = of(null);
  ngOnInit(): void {
    this.#authService.createConnection()
    if(this.data$) {
      console.log('Existws');
    } else {
      console.log('Else');
      
    }
    // this.getStocks1();
    this.createForm();
    this.loginForm.get('role').valueChanges.subscribe(d => console.log(d));
    this.buttonClick$.subscribe(d => console.log(d));
  }

  onButtonClick() {
    // Emit a value to the Subject when the button is clicked
    this.buttonClick$.next();
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
    this.#authService.login(this.loginForm.getRawValue())
    .subscribe({
      next: (resp: LoginResponseI) => this.handleResponse(resp),
      error: (error) => this.loginApiCallProgress.set(false),
      complete: () => {}
    },
    )
  }

  handleResponse(resp: LoginResponseI) {
    const { userName, role } = resp.data.user;
    this.#authService.updateUserProfile({ userName, role })
    sessionStorage.setItem('TOKEN', resp.data.token);
    this.#router.navigate(['vehicle'])
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


  // getStocks1() {
  //   this.#authService.getStockPrices()
  //   .pipe(takeUntil(this.unsub))
  //   .subscribe(stocksInfo => {
  //     console.log(stocksInfo);
  //     if(typeof stocksInfo) {
        
  //       console.log('string');
  //     } else {
  //       console.log('not string');
        
  //     }

  //     this.cricketScore.set(stocksInfo);

  //   }
  //     )
      
    
  // }

  disconnect() {
    this.#authService.closeConnection();
  }

  testData = 'Bhargav';
  check() {
    this.status.set(false)
    setTimeout(() => {
      this.testData = 'Bhargav R G';
      console.log(this.testData);
      
    }, 0)
  }




}