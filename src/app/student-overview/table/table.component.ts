import { Component, Input, effect, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() value: string;

  firstName=model('')

  // value = input<string>();

  // constructor() {
  //   effect(() => {
  //     console.log(this.value())
  //   })
  // }

}
