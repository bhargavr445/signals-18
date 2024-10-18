import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'u-label',
  standalone: true,
  imports: [NgClass],
  templateUrl: './u-label.component.html',
  styleUrl: './u-label.component.scss'
})
export class ULabelComponent {

  for = input.required<string>();
  isInValid = input<boolean>(false);

}
