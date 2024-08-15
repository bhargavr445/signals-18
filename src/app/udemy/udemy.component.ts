import { Component } from '@angular/core';
import { CreateCourseComponent } from './create-course/create-course.component';

@Component({
  selector: 'app-udemy',
  standalone: true,
  imports: [CreateCourseComponent],
  templateUrl: './udemy.component.html',
  styleUrl: './udemy.component.scss'
})
export class UdemyComponent {

  

}
