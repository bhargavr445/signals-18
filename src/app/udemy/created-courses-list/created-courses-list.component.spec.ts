import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCoursesListComponent } from './created-courses-list.component';

describe('CreatedCoursesListComponent', () => {
  let component: CreatedCoursesListComponent;
  let fixture: ComponentFixture<CreatedCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedCoursesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
