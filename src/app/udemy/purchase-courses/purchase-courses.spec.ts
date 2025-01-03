import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCourses } from './purchase-courses';

describe('PurchaseCourses', () => {
  let component: PurchaseCourses;
  let fixture: ComponentFixture<PurchaseCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
