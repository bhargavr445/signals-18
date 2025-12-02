import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal, model, ModelSignal, OutputRef } from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

@Component({
  selector: 'app-cp-input',
  imports: [],
  template: `
    <input type="text" 
      [value]=value() 
      (input)="onValueChange($event)"
      
      >
    <div class="validation-msg">
      @for (item of errors(); track item.kind) {
              {{item.message}}
      }
      </div>
  `,
  styleUrl: './cp-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CpInputComponent implements FormValueControl<string> {
  
  value: ModelSignal<string> = model('');
  // checked?: undefined;
  errors?: InputSignal<readonly WithOptionalField<ValidationError>[]> = input();
  // disabled?: InputSignal<boolean>;
  // disabledReasons?: InputSignal<readonly WithOptionalField<DisabledReason>[]>;
  // readonly?: InputSignal<boolean>;
  // hidden?: InputSignal<boolean>;
  // invalid?: InputSignal<boolean>;
  // pending?: InputSignal<boolean>;
  // touched?: InputSignal<boolean> | ModelSignal<boolean> | OutputRef<boolean>;
  // dirty?: InputSignal<boolean>;
  // name?: InputSignal<string>;
  // required?: InputSignal<boolean>;
  // min?: InputSignal<number>;
  // minLength?: InputSignal<number>;
  // max?: InputSignal<number>;
  // maxLength?: InputSignal<number>;
  // pattern?: InputSignal<readonly RegExp[]>;

  onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }

}
