import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleOverviewComponent } from './Vehicle/Components/vehicle-overview/vehicle-overview.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './Vehicle/Components/cart/cart.component';
import { ModalContainerDirective } from './commons/directives/modal-container.directive';
import { ModalHostComponent } from './commons/components/modal-host/modal-host.component';
import { BehaviorSubject, Observable, Subject, combineLatest, delay, filter, interval, of, startWith, switchMap, take, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ModalService } from './commons/services/api/modal.service';
import { AuthService } from './commons/services/api/auth.service';
import { VehicleService } from './commons/services/api/vehicle.service';
import { UdemyService } from './commons/services/api/udemy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe, 
    RouterOutlet, 
    VehicleOverviewComponent, 
    HeaderComponent, 
    CartComponent, 
    ModalContainerDirective, 
    ModalHostComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  udemyService = inject(UdemyService)
  id = new BehaviorSubject<number>(0);
  id$ = this.id.asObservable();
  sub$ = new Subject<boolean>();
  mpdpCall: any;

  source1$ = of('first').pipe(delay(2000));
  source2$ = of('Second').pipe(delay(4000));

  resp$: Observable<any> = of();
  name: string = 'Bhargav';

  constructor() {
    const data = {
      searchOn: 'Bhargav',
      limit: 20,
      size: 10
    }
    this.buildParams(data)
  }

  ngOnInit(): void {
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
    this.name = 'boby' 
    this.sub$.next(true);
    this.sub$.complete();
    
  }
 

  buildParams(dataObj) {
    const keys = Object.keys(dataObj);
    const queryParams = keys.reduce((initialValue, key, index) => {
      const prefix = index === 0 ? '?' : '&';
      return `${initialValue}${prefix}${key}=${dataObj[key]}`
    }, '');
    console.log(queryParams);
  }

  authService = inject(AuthService);
  modalService = inject(ModalService);
  title = 'signals-18';
  counter = signal(0);
  showCounter = signal(false);
  doubleCounter = computed(() => {
    return this.counter() * 2;
  });

  showModal() {
    const compRef = this.modalService.dynamicComponentOnDOM();
    compRef.openModal({
      content: 'Are you sure that you want to remove this item from Cart?',
      primaryButton: 'Cancel',
      secondaryButton: 'Confirm',
      headerLabel: 'Confirmation',
      toggleStatus: 'o'
    });

    compRef.closeEvent.subscribe((closeType) => {
      console.log(closeType);
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

  ngOnDestroy(): void {
    this.authService.logout().subscribe()
    sessionStorage.clear();
  }

}
