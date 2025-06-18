import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { BuyCoursesComponent } from './buy-courses.component';
import { provideHttpClient } from '@angular/common/http';

describe('BuyCoursesComponent', () => {
  let component: BuyCoursesComponent;
  let fixture: ComponentFixture<BuyCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
      imports: [BuyCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
