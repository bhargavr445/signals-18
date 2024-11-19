import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, filter, map, of, switchMap, tap } from 'rxjs';
import { TableSkeletonComponent } from '../../commons/components/table-skeleton/table-skeleton.component';
import { ULabelComponent } from '../../commons/components/u-label/u-label.component';
import { UdemyService } from '../../commons/services/api/udemy.service';
import { CreatedCoursesListComponent } from '../created-courses-list/created-courses-list.component';
import { CreateCoursePayloadI } from '../interfaces/udemy-i';
import * as udemyActions from '../store/udemy.actions';
import { UdemyInitialStateI } from '../store/udemy.reducer';
import * as udemySelector from '../store/udemy.selectors';
import { ValidationMessages as vm } from '../../commons/constants/validation.constants';
import { TableHeaderComponent } from '../../commons/components/table-header/table-header.component';


@Component({
    selector: 'create-course',
    imports: [
        AsyncPipe, ULabelComponent,
        FormsModule, ReactiveFormsModule, TableHeaderComponent,
        CreatedCoursesListComponent, TableSkeletonComponent
    ],
    templateUrl: './create-course.component.html',
    styleUrl: './create-course.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateCourseComponent implements OnInit {

  data = inject(ROUTER_OUTLET_DATA) as Signal<string>;


  validations = signal([vm.maxLength, vm.minLength, vm.required]);


  
  #udemyService = inject(UdemyService);
  #store = inject(Store<UdemyInitialStateI>);

  createCourseForm: FormGroup;
  
  categorys$  = toSignal(this.#store.select(udemySelector.categoryListSelector), {initialValue: []});
  createdCoursesList = toSignal(this.#store.select(udemySelector.createdCoursesListSelector));
  fetchCreatedCoursesLoading = toSignal(this.#store.select(udemySelector.createdCoursesLoadingSelector), {initialValue: false});
  createCourseLoading$ = this.#store.select(udemySelector.createCourseLoadingSelector);
  createCourseSuccess$ = this.#store.select(udemySelector.createCourseSuccessSelector).pipe(
    filter(createCourseResponse => createCourseResponse),
    tap(() => this.createCourseForm.reset()))

  ngOnInit() {
    this.createForm();
    this.#store.dispatch(udemyActions.fetchCategorysStartAction());
    this.#store.dispatch(udemyActions.fetchAllCreatedCoursesStart());
    this.createCourseSuccess$.subscribe();
  }

  createForm() {
    this.createCourseForm = new FormGroup({
      course_id: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(14), Validators.minLength(5)], asyncValidators: [
          (control: AbstractControl) => {
            return of(control.value).pipe(
              filter((value) => !!value),
              delay(300),
              switchMap((value) => this.#udemyService.checkIfIdExists(value).pipe(map((resp) => resp ? { exist: true } : null)))
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
      this.#store.dispatch(udemyActions.createCourseStart({ value: this.createCourseForm.value as CreateCoursePayloadI }))
    }
  }

}
