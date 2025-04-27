import { Component, input, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'radio-buttons',
  imports: [FormsModule, ReactiveFormsModule],
  template: `@for (role of options; track role.key) {
      <div class="roles-container">
          <input type="radio" [value]="role.key" [id]="role.key" [formControl]="radioButtonControl" [placeholder]="role.label">
          <label class="check-box-label" for="role.key">{{role.label}}</label>
      </div>
      }
      @if(isFormSubmitted() && radioButtonControl.touched && radioButtonControl.hasError('required')) {
      <div class="validation-msg">
          This is a required Field
      </div>
      }`,
  styleUrl: './radio-buttons.component.scss'
})

export class RadioButtonsComponent {

  @Input({ required: true }) radioButtonControl: FormControl<any>;
  @Input({ required: true }) options: RadioButtonOptionsI[];
  isFormSubmitted = input(true);

}

interface RadioButtonOptionsI {
  key: string | number;
  label: string;
}