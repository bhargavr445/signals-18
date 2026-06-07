import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { UdemyComponent } from './udemy.component';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('UdemyComponent', () => {
  let component: UdemyComponent;
  let fixture: ComponentFixture<UdemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(withXhr()), provideRouter([])],
      imports: [UdemyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdemyComponent);
    component = fixture.componentInstance;
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
