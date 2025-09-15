import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ULabelComponent } from '../commons/components/u-label/u-label.component';
import { form, required, validate, Control, maxLength, minLength, customError, disabled, validateHttp, FieldPath, hidden } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { ApiResponseI } from '../commons/Interfaces/api-responseI';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';



@Component({
  selector: 'app-signal-forms',
  imports: [ULabelComponent, Control],
  templateUrl: './signal-forms.component.html',
  styleUrl: './signal-forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalFormsComponent {

  
  courseSignal = signal<CourseI>({
    courseId: '123',
    title: '',
    price: 0
  });
  
  courseForm = form(this.courseSignal, (path) => {
    required(path.courseId, { message: 'This is a required Field.' }),
    maxLength(path.courseId, 20, { message: 'Max 6 chars required ' }),
    minLength(path.courseId, 3, { message: 'Min 3 chars required ' }),
    // validate(path.courseId, (context) => {
      //   const priceState = context.stateOf(path.price);
      //   console.log(priceState.touched());
      //   return customError({
        //     kind: 'custom123',
        //     message: 'This is custom error'
        //   })
        // }),
        
        this.#checkIfIdAlreadyExists(path),
        
        required(path.price, {
          when: ({ stateOf }) => stateOf(path.courseId).valid(),
          message: 'This is a required Field.'
        }),
        // hidden(path.courseId, ({}) => )
        disabled(path.price, ({ stateOf }) => stateOf(path.courseId).invalid())
      });
      doubledPrice = computed(() => this.courseForm().value().price*2);
      
      #checkIfIdAlreadyExists(path: FieldPath<CourseI>) {
        validateHttp(path.courseId, {
      request: ({ value }) => ({
        url: `checkIdExists/${value()}`,
        method: 'GET'
      }),
      errors: (response: ApiResponseI<boolean>, _context) => {
        if (response.status === 1 && response.data === true) {
          return [{ kind: 'server-ssuccess', message: "Already Exists" }];
        } else if (response.status === 1 && response.data === false) {
          return [];
        } else {
          return [{ kind: 'server-error', message: "Please verify later" }]
        }
      }
    })
  }

  submit() {
    console.log(this.courseForm().errors());
    this.courseForm().reset();
  }

}

interface CourseI {
  courseId: string;
  title: string;
  price: number;
}



// Create the form, linking it to the model.

