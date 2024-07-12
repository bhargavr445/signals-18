import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounce, debounceTime, distinctUntilChanged, of, switchMap, throwError } from 'rxjs';
import { VehicleService } from '../Vehicle/Services/vehicle.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  vehicleService = inject(VehicleService);

  form: FormGroup;
  ngOnInit(): void {
    this.createForm()

    this.form.get('userName').valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() =>  this.vehicleService.getVehicleData('').pipe(catchError((error) => throwError(() => ({...error, errorFrom: 'API call 1'})))))
    ).subscribe((value) => {
      console.log(value);
    })
  }

  createForm() {
    this.form = new FormGroup({
      userName: new FormControl('')
    })
  }



  onEnter(event) {
    const value = event.target.value;
    console.log(value);
    of(value).pipe(
      debounceTime(1000),
    ).subscribe(() => console.log('ece'))
    
  }

  isVisible = false;

    openSlider() {
        this.isVisible = true;
    }

    closeSlider() {
        this.isVisible = false;
    }

}
