import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCoursesListComponent } from './created-courses-list.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CreatedCoursesListComponent', () => {
  let component: CreatedCoursesListComponent;
  let fixture: ComponentFixture<CreatedCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [CreatedCoursesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedCoursesListComponent);
    fixture.componentRef.setInput('createdCoursesList', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
