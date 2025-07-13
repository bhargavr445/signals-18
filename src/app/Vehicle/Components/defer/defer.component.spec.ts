import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DeferComponent } from './defer.component';

fdescribe('DeferComponent', () => {
  let component: DeferComponent;
  let fixture: ComponentFixture<DeferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],

      imports: [DeferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
