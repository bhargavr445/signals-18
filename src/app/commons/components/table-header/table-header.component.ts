import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'table-header',
    imports: [],
    template: `
  <div class="notification mar-b-20">
    <div class="notification-icon">&#10003;</div>
    <div class="notification-text">
        <b>{{headerText()}}</b>
    </div>
</div>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './table-header.component.scss'
})
export class TableHeaderComponent {

  readonly headerText = input.required();

}
