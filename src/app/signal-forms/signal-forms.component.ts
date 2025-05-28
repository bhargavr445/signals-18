import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  form,  
} from 'google3/experimental/angularsignalforms';


@Component({
  selector: 'app-signal-forms',
  imports: [],
  templateUrl: './signal-forms.component.html',
  styleUrl: './signal-forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalFormsComponent {

  // Create a model containing the initial form data.
 userModel = signal<User>({name: '', username: ''});

 userForm = form(userModel);

}

interface User {
  name: string;
  username: string;
}



// Create the form, linking it to the model.

