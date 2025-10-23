import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpInputComponent } from './cp-input.component';

describe('CpInputComponent', () => {
  let component: CpInputComponent;
  let fixture: ComponentFixture<CpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
