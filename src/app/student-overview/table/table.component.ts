import { Component, Input, signal, inject, model, CUSTOM_ELEMENTS_SCHEMA, input, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../Vehicle/Services/vehicle.service';
import { Result, VehiclesResponseI } from '../../Vehicle/Models/VehiclesI';
import { FilterComponent } from '../../commons/components/filter/filter.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, FilterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  isLoading = signal<boolean>(false);
  tableData = input.required<Result[]>();
  filterValue = signal('');
  paginatedRecords = signal<Result[]>([]);

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


}
