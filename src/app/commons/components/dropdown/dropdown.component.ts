import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DropdownComponent {

  @Input() formControlProp: FormControl<any>;


  displayprops = ['userId', 'userName'];
  options = [
    {userId: 'uid1', userName: 'user name1'},
    {userId: 'uid2', userName: 'user name2'},
    {userId: 'uid3', userName: 'user name3'}
  ];

  selectedOptionEvent(event) {
    console.log(event.detail);
    
    this.formControlProp.setValue(event.detail);
    // this.formControlProp.updateValueAndValidity({emitEvent: true});
  }



}
