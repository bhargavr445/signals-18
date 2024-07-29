import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-destroy',
  standalone: true,
  imports: [],
  templateUrl: './destroy.component.html',
  styleUrl: './destroy.component.scss'
})
export class DestroyComponent {

  ser = inject(AuthService)
  constructor(public df: DestroyRef) {

  }

}
