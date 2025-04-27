import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../commons/services/api/auth.service';

@Component({
    selector: 'app-destroy',
    imports: [],
    templateUrl: './destroy.component.html',
    styleUrl: './destroy.component.scss'
})
export class DestroyComponent {

  constructor(public df: DestroyRef) {

  }

}
