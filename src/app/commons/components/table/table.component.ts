import { JsonPipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'gbr-table',
  standalone: true,
  imports: [NgClass, JsonPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  dataList = input.required<any[]>();
  tableHeaders = input.required<any[]>();



}
