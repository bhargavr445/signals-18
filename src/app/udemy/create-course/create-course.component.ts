import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, Signal, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, filter, map, of, switchMap } from 'rxjs';
import { TableHeaderComponent } from '../../commons/components/table-header/table-header.component';
import { TableSkeletonComponent } from '../../commons/components/table-skeleton/table-skeleton.component';
import { ULabelComponent } from '../../commons/components/u-label/u-label.component';
import { ValidationMessages as vm } from '../../commons/constants/validation.constants';
import { UdemyService } from '../../commons/services/api/udemy.service';
import { CreatedCoursesListComponent } from '../created-courses-list/created-courses-list.component';
import { CreateCoursePayloadI } from '../interfaces/udemy-i';
import { UdemySignalStore } from '../store/udemy-signal-store';
import { UdemyInitialStateI } from '../store/udemy.reducer';


@Component({
  selector: 'create-course',
  imports: [
    ULabelComponent,
    FormsModule, ReactiveFormsModule, TableHeaderComponent,
    CreatedCoursesListComponent, TableSkeletonComponent
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
  providers: [UdemySignalStore],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateCourseComponent implements OnInit {

  data = inject(ROUTER_OUTLET_DATA) as Signal<string>;
  udemySignalStore = inject(UdemySignalStore);


  validations = signal([vm.maxLength, vm.minLength, vm.required]);
  #udemyService = inject(UdemyService);
  #store = inject(Store<UdemyInitialStateI>);

  createCourseForm: FormGroup;

  // categorys$  = toSignal(this.#store.select(udemySelector.categoryListSelector), {initialValue: []});
  categorys = this.udemySignalStore.categorysListC;

  createdCoursesListC = this.udemySignalStore.createdCoursesListC;
  createdCoursesLoadingC = this.udemySignalStore.createdCoursesLoadingC;
  // createdCoursesList = toSignal(this.#store.select(udemySelector.createdCoursesListSelector));
  // fetchCreatedCoursesLoading = toSignal(this.#store.select(udemySelector.createdCoursesLoadingSelector), {initialValue: false});
  // createCourseLoading$ = this.#store.select(udemySelector.createCourseLoadingSelector);
  createCourseLoadingC = this.udemySignalStore.createCourseLoadingC;
  createCourseSuccessC = this.udemySignalStore.createCourseSuccessC;
  // createCourseSuccess$ = this.#store.select(udemySelector.createCourseSuccessSelector).pipe(
  //   filter(createCourseResponse => createCourseResponse),
  //   tap(() => this.createCourseForm.reset()))

  ngOnInit() {
    this.createForm();
    // this.#store.dispatch(udemyActions.fetchCategorysStartAction());
    this.udemySignalStore.loadCategorys('');
    this.udemySignalStore.fetchCreatedCourses('');
    // this.#store.dispatch(udemyActions.fetchAllCreatedCoursesStart());
    // this.createCourseSuccess$.subscribe();
  }

  createForm() {
    this.createCourseForm = new FormGroup({
      course_id: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(14), Validators.minLength(5)], 
        asyncValidators: [
          (control: AbstractControl) => of(control.value).pipe(filter((value) => !!value),delay(300),switchMap((value) => this.#udemyService.checkIfIdExists(value).pipe(map((resp) => resp ? { exist: true } : null))))
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
      this.udemySignalStore.createCourse(this.createCourseForm.value as CreateCoursePayloadI)
      //this.#store.dispatch(udemyActions.createCourseStart({ value: this.createCourseForm.value as CreateCoursePayloadI }))
    }
  }

}
