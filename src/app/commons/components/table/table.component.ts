import { NgClass } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

@Component({
    selector: 'gbr-table',
    imports: [NgClass],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {

  dataList = input.required<any[]>();
  tableHeaders = input.required<any[]>();
  headersLength = computed(() => this.tableHeaders().length);


}
