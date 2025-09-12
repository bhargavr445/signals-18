import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CreateCourseComponent } from './create-course.component';
import { provideHttpClient } from '@angular/common/http';

xdescribe('CreateCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
      imports: [CreateCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
