import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { WeeksComponent } from './weeks.component';

describe('WeeksComponent', () => {
  let component: WeeksComponent;
  let fixture: ComponentFixture<WeeksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [WeeksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeksComponent, {
      bindings: [
        inputBinding('scheduleDays', signal([]))
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
