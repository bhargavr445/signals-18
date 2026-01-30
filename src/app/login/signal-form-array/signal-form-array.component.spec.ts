import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalFormArrayComponent } from './signal-form-array.component';

describe('SignalFormArrayComponent', () => {
  let component: SignalFormArrayComponent;
  let fixture: ComponentFixture<SignalFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormArrayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
