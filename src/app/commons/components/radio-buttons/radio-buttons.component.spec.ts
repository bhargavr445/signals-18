import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonsComponent } from './radio-buttons.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { FormControl } from '@angular/forms';

describe('RadioButtonsComponent', () => {
  let component: RadioButtonsComponent;
  let fixture: ComponentFixture<RadioButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonsComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonsComponent);
    component = fixture.componentInstance;
    component.radioButtonControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
