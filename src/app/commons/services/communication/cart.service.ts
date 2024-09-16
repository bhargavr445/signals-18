import { Injectable, signal } from '@angular/core';
import { Result } from '../../../Vehicle/Models/VehiclesI';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private vehicleCartSignal = signal<Result[]>([]);
  readonly vehicleCartReadonlySignal = this.vehicleCartSignal.asReadonly();
  

  addVehicleToCartSignal(vehicle: Result): void {
    this.vehicleCartSignal.update((prevCartitems) => [...prevCartitems, vehicle]);
  }

  removeitemFromCart(customId: string) {
    this.vehicleCartSignal.update((previousItems) => previousItems.filter((item) => item.customId !== customId));
  }

}
