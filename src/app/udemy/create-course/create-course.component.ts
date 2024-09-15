import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { UdemyService } from '../../commons/services/api/udemy.service';
import { AccountTypeI, CategorysI } from '../interfaces/udemy-i';
import { Observable, delay, filter, map, of, switchMap, tap } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CreatedCoursesListComponent } from '../created-courses-list/created-courses-list.component';

@Component({
  selector: 'create-course',
  standalone: true,
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule, CreatedCoursesListComponent],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateCourseComponent {
  udemyService = inject(UdemyService);

  createCourseForm: FormGroup;
  categorys$: Observable<CategorysI[]>;
  accountTypes$: Observable<AccountTypeI[]>;
  createdCoursesList$: Observable<any[]>;

  constructor() {
    
    let da = {
      name: 'bh'
    }
    this.createForm();
    this.getCategorys();
    this.getAccountTypes();
    this.createdCoursesList$ = this.fetchAllCreatedCourses();
    this.createCourseForm.valueChanges.subscribe(() => console.log(this.createCourseForm));
  }

  getCategorys() {
    //  try {
    // // Step 1: Create a new course
    // const course = new Course({
    //   title: "New Course",
    //   description: "Course Description",
    //   price: 12.99,
    //   // other fields...
    // });

  //   const savedCourse = await course.save();
  //   const courseId = savedCourse._id;

  //   // Step 2: Update the user with the new course ID
  //   const userUpdateResult = await User.updateOne(
  //     { _id: userId }, // Find the user by their _id
  //     { $push: { purchasedCourses: courseId } } // Add the courseId to the purchasedCourses array
  //   );

  //   if (userUpdateResult.nModified === 0) {
  //     throw new Error('User update failed. No documents were modified.');
  //   }

  //   console.log("Course created and user updated successfully");
  // } catch (err) {
  //   // Check if it's a validation error, database connection error, etc.
  //   if (err.name === 'ValidationError') {
  //     console.error("Validation Error:", err.message);
  //   } else if (err.name === 'MongoNetworkError') {
  //     console.error("Network Error: Could not connect to the database.");
  //   } else {
  //     console.error("Error updating course or user:", err);
  //   }
    
  //   // Optional: Rollback the course creation if needed
  //   // await Course.deleteOne({ _id: courseId });
  // }
    this.categorys$ = this.udemyService.fetchCategorys().pipe(map(resp => resp.data))
  }

  getAccountTypes() {
    this.accountTypes$ = this.udemyService.fetchAccountTypes().pipe(map(resp => resp.data))
  }

  createForm() {
    this.createCourseForm = new FormGroup({
      course_id: new FormControl('', { asyncValidators: [
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
      console.log(this.createCourseForm);
      this.createdCoursesList$ = this.udemyService.createCourse(this.createCourseForm.value).pipe(
        tap(() => this.createCourseForm.reset()),
        switchMap(() => this.fetchAllCreatedCourses())
      )
    }
  }

  fetchAllCreatedCourses(): Observable<any> {
    return this.udemyService.fetchAllCreatedCourses().pipe(
      tap((resp) => console.log(resp)),
      map((resp) => resp['data']));
  }
    

}
