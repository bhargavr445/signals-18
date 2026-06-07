import { Component, computed, inject, signal } from '@angular/core';
import { FormField, debounce, disabled, form, maxLength, minLength, required, validateHttp } from '@angular/forms/signals';
import { ULabelComponent } from '../commons/components/u-label/u-label.component';
import { ApiResponseI } from '../commons/Interfaces/api-responseI';
import { CpInputComponent } from '../commons/components/cp-input/cp-input.component';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-signal-forms',
  imports: [ULabelComponent, FormField, CpInputComponent],
  templateUrl: './signal-forms.component.html',
  styleUrl: './signal-forms.component.scss'
})
export class SignalFormsComponent {

  gameService = inject(GameService);

  courseSignal = signal<CourseI>({
    courseId: '123',
    title: '',
    price: 0
  });
  
  courseForm = form(this.courseSignal, (path) => {
    required(path.courseId, { message: 'This is a required Field.' }),
    required(path.title, { message: 'This is a required Field.' }),
      maxLength(path.courseId, 20, { message: 'Max 6 chars required ' }),
      minLength(path.courseId, 3, { message: 'Min 3 chars required ' }),
      debounce(path.courseId, 1000),
      
      // validate(path.courseId, (context) => {
      //   const priceState = context.stateOf(path.price);
      //   console.log(priceState.touched());
      //   return customError({
      //     kind: 'custom123',
      //     message: 'This is custom error'
      //   })
      // }),

      /* 🚀 async validation  */
      this.#checkIfIdAlreadyExists(path),

      required(path.price, {
        when: ({ stateOf }) => stateOf(path.courseId).valid(),
        message: 'This is a required Field.'
      }),
      // hidden(path.courseId, ({}) => )
      disabled(path.price, ({ stateOf }) => stateOf(path.courseId).invalid())
  });
  doubledPrice = computed(() => this.courseForm().value().price * 2);


  // #checkIfIdAlreadyExists(path: FieldPath<CourseI>) {
  #checkIfIdAlreadyExists(path) {
    validateHttp(path.courseId, {
      request: ({ value }) => ({
        url: `checkIdExists/${value()}`,
        method: 'GET'
      }),
      onSuccess: (response: ApiResponseI<boolean>, context) => {
        if (response.status === 1 && response.data === true) {
          return [{ kind: 'server-ssuccess', message: "Already Exists" }];
        } else if(response.status === 1 && response.data === false) {
          return [];
        }
        return [];
      },
      onError: (error, context) => {
          return [{ kind: 'Failed to validate from Server', message: "Please verify later API is down" }]
      }
    })
  }

  submit() {
    console.log(this.courseForm().errorSummary()[0]);
    const na = this.courseForm().errorSummary()[0];
    na.fieldTree().focusBoundControl()
    // this.courseForm().reset();
    // console.log(this.courseForm().value());
  }

  updateVal() {
    this.courseSignal.update((prev) => ({...prev, title: 'Allowing'}))
    this.fetchPromiseData();
  }

  fetchPromiseData() {
    this.gameService.returnPromiseData(false)
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  }

}

interface CourseI {
  courseId: string;
  title: string;
  price: number;
}



// Create the form, linking it to the model.

