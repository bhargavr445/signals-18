import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {

}
