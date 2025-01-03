import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCoursesList } from './created-courses-list';

describe('CreatedCoursesList', () => {
  let component: CreatedCoursesList;
  let fixture: ComponentFixture<CreatedCoursesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedCoursesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedCoursesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
