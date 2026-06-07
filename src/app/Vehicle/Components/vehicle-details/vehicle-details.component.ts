import { Component, Input, Input as RouteParam, Input as QueryParam, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-vehicle-details',
    imports: [],
    template: `<div class="main">
      <h5>VSelected Vehicle ID: </h5><h3>{{cIds}}</h3>
    </div>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent {

  @RouteParam('custid') cIds:  any;
  @Input() mid: any;
  @QueryParam() id: any;

  // cId = input.required<any>({alias: 'custid'})

}
