import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, Subject, delay, of } from 'rxjs';
import { ModalHostComponent } from './commons/components/modal-host/modal-host.component';
import { AuthService } from './commons/services/api/auth.service';
import { ModalService } from './commons/services/api/modal.service';
import { UdemyService } from './commons/services/api/udemy.service';
import { HeaderComponent } from './header/header.component';
import { Chat } from './chat/chat';

@Component({
    selector: 'app-root',
    imports: [
        AsyncPipe,
        RouterOutlet,
        HeaderComponent,
        Chat,
        ModalHostComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  #authService = inject(AuthService);
  #modalService = inject(ModalService);

  name1: string = 'Bhargav';
  name2: string = this.name1;

  stu1 = {name: 'Surya', id: 10};
  stu2 = this.stu1;
  id = new BehaviorSubject<number>(0);
  id$ = this.id.asObservable();
  sub$ = new Subject<boolean>();
  mpdpCall: any;

  source1$ = of('first').pipe(delay(2000));
  source2$ = of('Second').pipe(delay(4000));

  resp$: Observable<any> = of();
  name = signal('Bhargav');
  protected title = 'signals-18';
  counter = signal(0);
  userProfileInfo = computed(() =>  this.#authService.userProfileS());

  constructor() {
    const data = {
      searchOn: 'Bhargav',
      limit: 20,
      size: 10
    }
    this.buildParams(data)

    const transactions = [
      "Neeraja, 40, md",
      "Bhargav, 50, va",
      "kausar, 20, nc",
      "Bhargav, 50, va",
    ];
//     const transactions = [
//   "Neeraja, 10, md",
//   "Neeraja, 30, va",
//   "Neeraja, 50, ny"
// ];
// const transactions = [
//   "alice, 50, sf",   // in a stream, you can't know yet it's invalid
//   "bob, 10, la",
//   "alice, 60, ny"    // now both alice records become invalid
// ];
    this.checkDuplicate(transactions);
  }

  checkIfRecordExistWithNameAndTime(tran: string, duplicateTransactions: string[]): boolean {
    if (duplicateTransactions.length === 0) {
      return false;
    }
    const [name, min, state] = tran.split(',');
    const duplicateTranFound = duplicateTransactions.find((dupTransaction) => {
      const [dupName, dupMin, dupState] = dupTransaction.split(',');
      if (name.trim() === dupName.trim() && state.trim() != dupState.trim() && Math.abs(parseInt(dupMin) - parseInt(min)) <= 60) {
        return dupTransaction
      } else {
        return false
      }
    })
    return !!duplicateTranFound;
  }

  checkDuplicate(incomingTransactions: string[]) {
    const duplicateTransactions: string[] = [];
    incomingTransactions.forEach((tran) => {
      const bol = this.checkIfRecordExistWithNameAndTime(tran, incomingTransactions)
      if (bol) {
        duplicateTransactions.push(tran);
      }
    })
    console.log(duplicateTransactions);
  }



  findMaxNumber(nestedArray) {
    return nestedArray.reduce((max, val) => Array.isArray(val) ? Math.max(max, this.findMaxNumber(val)) : Math.max(max, val), -Infinity);
  }

  ngOnInit(): void {
    const nestedArray = [1, [2, 3, [4, 5], 6], [7, 8]];
    // console.log(this.findMaxNumber(nestedArray));
    const data = [10, 40, 20];
// console.log(Math.max(data, 40))
    this.name1 = 'Bhargav R G';


    this.stu1.name = 'Surya Teja';
    // this.udemyService.fetchAllCreatedCourses()
    // .pipe(
    //   takeUntil(this.sub$)
    // )
    // .subscribe(
    //     d => console.log(d),
    //     error => console.log(error)
    //   );
    // this.id$.pipe(
    //   switchMap(() => {
    //     this.mpdpCall && this.mpdpCall.unsubscribe()
    //     this.mpdpCall = this.udemyService.fetchAllCreatedCourses().subscribe(
    //       (resp) => {
    //         console.log(resp);
            
    //         this.mpdpCall.unsubscribe()
    //       }
    //     )
    //     return combineLatest([
    //       this.source1$,
    //       this.source2$,
    //     ])
    //   }
    //   )
    // )
    //   .subscribe({
    //     next: d => console.log(d),
    //     error: error => console.log(error)
    //   }
    //   );
  //  .subscribe(
  //     (resp) => { console.log(resp) },
  //     (error) => { console.log(error) }
  //   )
  }

  unsub() {
    // this.name = 'boby' 
    this.sub$.next(true);
    this.sub$.complete();
  }

  buildParams(dataObj) {
    const keys = Object.keys(dataObj);
    const queryParams = keys.reduce((initialValue, key, index) => {
      const prefix = index === 0 ? '?' : '&';
      return `${initialValue}${prefix}${key}=${dataObj[key]}`
    }, '');
  }

  showCounter = signal(false);
  doubleCounter = computed(() => {
    return this.counter() * 2;
  });

  showModal() {
    const compRef = this.#modalService.dynamicComponentOnDOM();
    compRef.openModal({
      content: 'Are you sure that you want to remove this item from Cart?',
      primaryButton: 'Cancel',
      secondaryButton: 'Confirm',
      headerLabel: 'Confirmation',
      toggleStatus: 'o'
    });

    compRef.closeEvent.subscribe((closeType) => {
      // console.log(closeType);
    })
  }

  inc() {
    const someVar = 'test';
    this.counter.update((prevValue) => {
      return prevValue + 1
    });
    

    this.showCounter.update(prevValue => !prevValue);
  }

  incrId() {
    this.id.next(this.id.value+1);
  }

  changeUerName() {
    this.name.set(Math.random().toString());
  }

  ngOnDestroy(): void {
    this.#authService.logout().subscribe()
    sessionStorage.clear();
  }

}
