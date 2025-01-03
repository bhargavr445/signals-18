import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-vehicle',
    imports: [RouterOutlet],
    template: `<router-outlet />`,
    styleUrl: './vehicle.scss'
})
export class Vehicle {

}
