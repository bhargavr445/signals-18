import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DestroyComponent } from './destroy.component';

describe('DestroyComponent', () => {
  let component: DestroyComponent;
  let fixture: ComponentFixture<DestroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],

      imports: [DestroyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
