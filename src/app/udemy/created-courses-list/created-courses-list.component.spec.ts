import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCoursesListComponent } from './created-courses-list.component';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';

describe('CreatedCoursesListComponent', () => {
  let component: CreatedCoursesListComponent;
  let fixture: ComponentFixture<CreatedCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [CreatedCoursesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedCoursesListComponent, {
      bindings: [
        inputBinding('createdCoursesList', signal([]))
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
