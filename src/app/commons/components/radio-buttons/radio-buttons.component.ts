import { Component, input, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'radio-buttons',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './radio-buttons.component.html',
  styleUrl: './radio-buttons.component.scss'
})

export class RadioButtonsComponent {

  @Input({required: true}) radioButtonControl: FormControl<any>;
  @Input({required: true}) options: RadioButtonOptionsI[];
  isFormSubmitted = input(true);

}

interface RadioButtonOptionsI {
  key: string | number;
  label: string;
}