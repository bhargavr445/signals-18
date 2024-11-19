import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { UdemyService } from '../../commons/services/api/udemy.service';

@Component({
    selector: 'app-purchase-courses',
    imports: [CurrencyPipe],
    templateUrl: './purchase-courses.component.html',
    styleUrl: './purchase-courses.component.scss'
})
export class PurchaseCoursesComponent implements OnInit {
  
  coursesList = [];
  #udemyService = inject(UdemyService);
  tableheaders = signal([
    { label: 'Title', key: 'title', },
    { label: 'Price', key: 'price', },
    { label: 'Type', key: 'categoryDetails.type' },
    // { label: 'Increase/Descrease in %', key: 'diff' }
  ]);




  ngOnInit(): void {
    this.#udemyService.getEnrolledCourses().subscribe(
      (resp) => {
        console.log(resp);
        this.coursesList = resp.data
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
