import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleOverviewComponent } from './Vehicle/Components/vehicle-overview/vehicle-overview.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './Vehicle/Components/cart/cart.component';
import { AuthService } from './auth.service';
import { ModalService } from './commons/services/modal.service';
import { ModalContainerDirective } from './commons/directives/modal-container.directive';
import { ModalHostComponent } from './commons/components/modal-host/modal-host.component';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, VehicleOverviewComponent, HeaderComponent, CartComponent, ModalContainerDirective, ModalHostComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  resp$: Observable<any> = of();

  constructor() {
    const data = {
      searchOn: 'Bhargav',
      limit: 20,
      size: 10
    }
    this.buildParams(data)
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

}
