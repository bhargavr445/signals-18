import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCoursesComponent } from './purchase-courses.component';

describe('PurchaseCoursesComponent', () => {
  let component: PurchaseCoursesComponent;
  let fixture: ComponentFixture<PurchaseCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
