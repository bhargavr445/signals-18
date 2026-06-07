import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-vehicle',
    imports: [RouterOutlet],
    template: `<router-outlet />`,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {

}
