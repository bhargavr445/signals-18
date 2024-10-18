import { AsyncPipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, delay, filter, map, of, switchMap, tap } from 'rxjs';
import { ULabelComponent } from '../../commons/components/u-label/u-label.component';
import { UdemyService } from '../../commons/services/api/udemy.service';
import { CreatedCoursesListComponent } from '../created-courses-list/created-courses-list.component';
import { CategorysI, CreateCoursePayloadI } from '../interfaces/udemy-i';
import * as udemyActions from '../store/udemy.actions';
import * as udemySelector from '../store/udemy.selectors';

@Component({
  selector: 'create-course',
  standalone: true,
  imports: [
    AsyncPipe, ULabelComponent, NgClass, 
    FormsModule, ReactiveFormsModule, CreatedCoursesListComponent
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateCourseComponent {
  
  udemyService = inject(UdemyService);
  store = inject(Store);

  createCourseForm: FormGroup;
  
  categorys$: Observable<CategorysI[]> = this.store.select(udemySelector.categoryListSelector);
  createdCoursesList$ = this.store.select(udemySelector.createdCoursesListSelector);
  fetchCreatedCoursesLoading$ = this.store.select(udemySelector.createdCoursesLoadingSelector);
  createCourseLoading$ = this.store.select(udemySelector.createCourseLoadingSelector);
  createCourseSuccess$ = this.store.select(udemySelector.createCourseSuccessSelector).pipe(
    filter(createCourseResponse => createCourseResponse),
    tap(() => this.createCourseForm.reset())
  ).subscribe();

  constructor() {
    this.createForm();
    this.store.dispatch(udemyActions.fetchCategorysStartAction());
    this.store.dispatch(udemyActions.fetchAllCreatedCoursesStart());
  }

  createForm() {
    this.createCourseForm = new FormGroup({
      course_id: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(14), Validators.minLength(5)], asyncValidators: [
          (control: AbstractControl) => {
            return of(control.value).pipe(
              filter((value) => !!value),
              delay(300),
              switchMap((value) => this.udemyService.checkIfIdExists(value).pipe(map((resp) => resp ? { exist: true } : null)))
            );
          }
        ]
      }),
      title: new FormControl(''),
      description: new FormControl(),
      price: new FormControl(),
      categoryType: new FormControl(),
    })
  }

  selectedOptionEvent(event) {
    this.createCourseForm.get('categoryType').setValue(event.detail.code)
  }

  createCourse(): void {
    if (this.createCourseForm.valid) {
      this.store.dispatch(udemyActions.createCourseStart({ value: this.createCourseForm.value as CreateCoursePayloadI }))
    }
  }

}
