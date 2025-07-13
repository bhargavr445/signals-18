import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { SignalFormsComponent } from './signal-forms.component';

fdescribe('SignalFormsComponent', () => {
  let component: SignalFormsComponent;
  let fixture: ComponentFixture<SignalFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [SignalFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
