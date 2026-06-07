import { NgClass } from '@angular/common';
import { Component, computed, input, InputSignal, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'gbr-table',
    imports: [NgClass],
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './table.component.scss'
})
export class TableComponent {

  dataList: InputSignal<any[]> = input.required<any[]>();
  tableHeaders = input.required<any[]>();
  headersLength = computed(() => this.tableHeaders().length);


}
