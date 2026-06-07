import { Component, model, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filter',
    imports: [FormsModule],
    template: `
    <div class="search-main">
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Filter" [(ngModel)]="searchText">
        <span class="search-icon">🔍</span>
      </div>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './filter.component.scss'
})
export class FilterComponent {

  searchText = model('');  

}
