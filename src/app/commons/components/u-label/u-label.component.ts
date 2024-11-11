import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'u-label',
  standalone: true,
  imports: [NgClass],
  template: `
  <label 
    [for]="for()"
    [ngClass]="{'label-error': isInValid()}">
    <ng-content></ng-content>
  </label>`,
  styles: `
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.label-error {
    color: red ;
}
  `
})
export class ULabelComponent {

  for = input.required<string>();
  isInValid = input<boolean>(false);

}
