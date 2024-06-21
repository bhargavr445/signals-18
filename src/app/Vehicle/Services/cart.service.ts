import { Injectable, signal } from '@angular/core';
import { Result } from '../Models/VehiclesI';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  vehicleCartSignal = signal<Result[]>([]);
  //veh = new BehaviorSubject<Result[]>([]);

  addVehicleToCartSignal(vehicle: Result): void {
    this.vehicleCartSignal.update((prevCartitems) => [...prevCartitems, vehicle]);
    // const prevValues = this.veh.value;
    // this.veh.next([...prevValues, vehicle]);
  }

  removeitemFromCart(customId: string) {
    this.vehicleCartSignal.update((previousItems) => previousItems.filter((item) => item.customId !== customId));
  }

}

  // addVehicleToCart(vehicle: Result): void {
  //   const cartitems = this.vehiclesCart.value;
  //   const updatedItems = [...cartitems, vehicle];
  //   this.vehiclesCart.next(updatedItems);
  // }
  // vehiclesCart = new BehaviorSubject<Result[]>([]);

