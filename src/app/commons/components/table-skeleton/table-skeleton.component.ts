import { Component } from '@angular/core';

@Component({
  selector: 'table-skeleton',
  standalone: true,
  template: `
    <div class="skeleton">
      <div class="skeleton-row">
          <span style="width: 20%;"></span>
          <span style="width: 50%;"></span>
          <span style="width: 20%;"></span>
      </div>
      @for(i of [1,2,3,4,5,6]; track i) {
      <div class="skeleton-row">
          <span style="width: 20%;"></span>
          <span style="width: 50%;"></span>
          <span style="width: 20%;"></span>
      </div>
      }
      </div>
      <div class="pagination-bar ">
          <div class="skeleton skeleton-pagination"></div>
      </div>
      `
})
export class TableSkeletonComponent {

}
