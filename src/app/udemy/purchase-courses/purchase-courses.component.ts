import { Component, OnInit, inject, signal } from '@angular/core';
import { UdemyService } from '../../commons/services/api/udemy.service';
import { CommunicationService } from '../../commons/services/communication/communication.service';
import { TableComponent } from '../../commons/components/table/table.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-purchase-courses',
  standalone: true,
  imports: [TableComponent, CurrencyPipe],
  templateUrl: './purchase-courses.component.html',
  styleUrl: './purchase-courses.component.scss'
})
export class PurchaseCoursesComponent implements OnInit {
  
  coursesList = [];
  udemyService = inject(UdemyService);
  tableheaders = signal([
    { label: 'Title', key: 'title', },
    { label: 'Price', key: 'price', },
    { label: 'Type', key: 'categoryDetails.type' },
    // { label: 'Increase/Descrease in %', key: 'diff' }
  ]);




  ngOnInit(): void {
    this.udemyService.getEnrolledCourses().subscribe(
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
