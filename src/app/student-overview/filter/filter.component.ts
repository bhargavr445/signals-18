import { Component, EventEmitter, OnInit, Output, computed, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
  <input type="text" [(ngModel)]="filterValue">
  `,
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  filterValue = model('');

}
