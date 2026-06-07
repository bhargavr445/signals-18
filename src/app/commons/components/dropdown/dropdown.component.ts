import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, Input, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DropdownComponent {
  name = signal('Test');
  stu = {
    id: 10,
    name: 'Bhargav'
  }

  cdr = inject(ChangeDetectorRef);

  constructor() {
    /// api call 
  }

  @Input() formControlProp: FormControl<any>;


  displayprops = ['userId', 'userName'];
  options = [
    { userId: 'uid1', userName: 'user name1' },
    { userId: 'uid2', userName: 'user name2' },
    { userId: 'uid3', userName: 'user name3' }
  ];

  selectedOptionEvent(event) {
    // console.log(event.detail);
    this.formControlProp.setValue(event.detail);
  }

  upodateMe() {
    this.name.set('test123');
  }



}
