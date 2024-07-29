import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output, effect, input, signal } from '@angular/core';
import { UniversityListI } from '../../interfaces/UniversityListI';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../commons/components/table/table.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-university-table',
  standalone: true,
  imports: [JsonPipe, FormsModule, NgFor, NgIf, TableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './university-table.component.html',
  styleUrl: './university-table.component.scss'
})
export class UniversityTableComponent {

  universityList = input.required<UniversityListI[]>();
  paginatedRecords = signal<UniversityListI[]>([])
  dropDownList = input.required<string[]>();
  query: string = '';
  filteredItems: string[] = [];

  tableHeaders = [

    { label: 'Name', key: 'name' },
    { label: 'Country', key: 'country' },
  ];

  @Output() dropDownSelection = new EventEmitter<string>();

  constructor() {
    effect(() => {
      console.log('exec...');

      this.query = this.dropDownList()[0]
    })
  }

  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as UniversityListI[]);
  }

  selectedOptionEvent(event) {
    this.dropDownSelection.emit(event.detail);
  }

  onInputChange() {
    if (this.query) {
      this.filteredItems = this.dropDownList().filter(item =>
        item.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.filteredItems = this.dropDownList();
    }
  }

  selectItem(item: string) {
    this.query = item;
    this.filteredItems = [];
    this.dropDownSelection.emit(this.query);

  }

  clearInput() {
    this.query = '';
    this.filteredItems = [];
  }

  onFocus(event) {
    const value = event.target.value;
    if (!value) {
      this.filteredItems = this.dropDownList();
    }
  }

}
