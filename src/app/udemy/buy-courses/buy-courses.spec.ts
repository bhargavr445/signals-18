import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCourses } from './buy-courses';

describe('BuyCourses', () => {
  let component: BuyCourses;
  let fixture: ComponentFixture<BuyCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
