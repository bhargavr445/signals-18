import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { Result } from '../../Models/VehiclesI';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss'
})
export class VehicleCardComponent {

  cartService = inject(CartService);
  vehicleInfo = input.required<Result>();
  emitSome = output<string>();
  counter = signal<number>(0);
  derivedCounter = computed(() => {
    // this.counter.set(100)
    return this.counter() * 2
  });

  selectedVehicle = signal<Result>({
    MakeId: null,
    MakeName: '',
    VehicleTypeId: null,
    VehicleTypeName: '',
    customId: ''
  });

  customVehicle = computed(() => {
    const incomingVehicle = this.vehicleInfo();
    const cartitems = this.cartService.vehicleCartSignal();
    // console.log('computed...');
    return {
      ...incomingVehicle,
      isEligibleForAddToCart: this.checkIsEligibleForAddToCart(cartitems)
    }
  })

  checkIsEligibleForAddToCart(cartItems: Result[]): boolean {
    const found = cartItems.find(item => item.customId === this.vehicleInfo().customId)
    return !found;
  }

  constructor() {
    effect(() => {
      // console.log('Exect1234...');
      const ctr = this.counter();
      // u
      // console.log(ctr)
      //trigger api call here
    })
  }

  onSelectedItem(vehicleInfo: Result) {
    this.selectedVehicle.set(vehicleInfo);
    this.cartService.addVehicleToCartSignal(vehicleInfo);

  }

  increase() {
    this.counter.update((previousValue) => previousValue + 1);
    this.emitSome.emit(this.counter().toString())
  }

}