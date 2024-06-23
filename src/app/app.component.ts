import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ang18Component } from './Vehicle/Components/vehicle-overview/vehicle-overview.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './Vehicle/Components/cart/cart.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ang18Component, HeaderComponent, CartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'signals-18';
  counter = signal(0);
  showCounter = signal(false);
  doubleCounter = computed(() => {
    return  this.counter() * 2;
  });

  constructor() {
    effect(() => {
      console.log(`${this.counter()}-${this.showCounter()}`);
    });
  }

  inc() {
    const someVar = 'test';
    this.counter.update((prevValue) => {
        return prevValue + 1
      });
    
    this.showCounter.update(prevValue => !prevValue);
  }

}

() => {

}