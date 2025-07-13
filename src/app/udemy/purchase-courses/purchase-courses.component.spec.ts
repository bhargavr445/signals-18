import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PurchaseCoursesComponent } from './purchase-courses.component';
import { provideHttpClient } from '@angular/common/http';

fdescribe('PurchaseCoursesComponent', () => {
  let component: PurchaseCoursesComponent;
  let fixture: ComponentFixture<PurchaseCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
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
