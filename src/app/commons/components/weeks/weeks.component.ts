import { JsonPipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-weeks',
  standalone: true,
  imports: [JsonPipe, NgClass],
  templateUrl: './weeks.component.html',
  styleUrl: './weeks.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeeksComponent {

  scheduleDays = input.required<string[]>();
  updatedWeeks = computed(() => this.updatedData(this.scheduleDays()));

  updatedData(days: string[]) {
    return this.weekDays.map((day) => {
      return {...day, isActive: days.indexOf(day.week) > -1 }
    } );
  }

  weekDays = [
    { week: 'Sunday', weekCode: 'S', isActive: false },
    { week: 'Monday', weekCode: 'M', isActive: false },
    { week: 'Tuesday', weekCode: 'T', isActive: false },
    { week: 'Wednesday', weekCode: 'W', isActive: false },
    { week: 'Thursday', weekCode: 'T', isActive: false },
    { week: 'Friday', weekCode: 'F', isActive: false },
    { week: 'Saturday', weekCode: 'S', isActive: false }
  ];

  handlePaginatedList(event) {
    console.log(event);
    
  }
}
