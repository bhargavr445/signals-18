import { Component, Input, Input as RouteParam, Input as QueryParam} from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [],
  template: `{{cIds}}`,
  styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent {

  @RouteParam('custid') cIds:  any;
  @Input() mid: any;
  @QueryParam() id: any;

  // cId = input.required<any>({alias: 'custid'})

}
