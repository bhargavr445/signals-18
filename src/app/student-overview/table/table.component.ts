import { Component, signal, CUSTOM_ELEMENTS_SCHEMA, input, computed, Output, EventEmitter } from '@angular/core';
import { Result } from '../../Vehicle/Models/VehiclesI';
import { reusableImports } from '../../imports.constants';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [...reusableImports, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  tableHeaders = signal([
    { label: 'Type', key: 'MakeName', styleClass: ['customFont'] },
    { label: 'Name', key: 'VehicleTypeName' },
  ]);

  cars = [
    { value: 'ford', key: 'Ford' },
    { value: 'merc', key: 'Merc' },
    { value: 'hyundai', key: 'Hyundai' },
    { value: 'honda', key: 'Honda' },
    { value: 'toyota', key: 'Toyota' },
    { value: 'kia', key: 'Kia' },
    { value: 'lexus', key: 'Lexus' },
    { value: 'tesla', key: 'Tesla' },
    { value: 'rivian', key: 'Rivian' },
  ]
  

  isLoading = signal<boolean>(false);
  tableData = input.required<Result[]>();
  filterValue = signal('');
  paginatedRecords = signal<Result[]>([]);
  @Output() dropDownSelection = new EventEmitter<string>();

  filteredTableData = computed(() => this.filterRecords(this.filterValue(), this.tableData()));



  filterRecords(text: string, list: Result[]) {
    return list.filter((vehiclle) => ['MakeName', 'VehicleTypeName'].some((prop) => this.checkFormatchingString(vehiclle[prop], text)));
  }

  checkFormatchingString(data: string, text: string): boolean {
    return data?.toString()?.toLocaleLowerCase()?.includes(text)
  }


  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail);
  }

  selectedOptionEvent(event) {
    this.dropDownSelection.emit(event.detail['value']);
  }

}
