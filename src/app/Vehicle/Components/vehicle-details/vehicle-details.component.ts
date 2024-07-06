import { Component, Input, Input as QueryParam, input} from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [],
  template: `{{cId()}}`,
  styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent {

  // @QueryParam('cId') cIds:  any;
  // @Input() mid: any;
  // @routeParam() id: any;

  cId = input.required<any>({alias: 'custid'})

}
