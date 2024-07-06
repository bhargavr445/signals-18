import { Component, computed, signal } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-student-overview',
  standalone: true,
  imports: [FilterComponent, TableComponent],
  template: `
  
  <app-filter [(filterValue)]="filterValue"/>
  {{filterValueLength()}}
  <app-table [value]="filterValue()"/>
  `,
  styleUrl: './student-overview.component.scss'
})
export class StudentOverviewComponent {

  filterValue = signal('');
  filterValueLength = computed(() => {
    return this.filterValue().length
  })

  filter(event) {
    
    // this.filterValue.set(event);
  }


}
function outer() {
  let x = 10;

  function inner() {
    console.log(x);
  }
}

console.log(outer());