import { Component, signal, CUSTOM_ELEMENTS_SCHEMA, input, computed, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Result } from '../../Vehicle/Models/VehiclesI';
import { reusableImports } from '../../imports.constants';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-table',
    imports: [...reusableImports],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  tableData = input.required<Result[]>();

  @Output() dropDownSelection = new EventEmitter<string>();

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
  filterValue = signal('');
  paginatedRecords = signal<Result[]>([]);

  filteredTableData = computed(() => this.filterRecords(this.filterValue(), this.tableData()));

  ngOnInit(): void {
    this.selectedOptionEvent({detail: this.cars[0]})
  }

  filterRecords(text: string, list: Result[]) {
    if(!!list) {
      return list?.filter((vehiclle) => ['MakeName', 'VehicleTypeName'].some((prop) => this.checkFormatchingString(vehiclle[prop], text)))
    } else {
      return [];
    }
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
