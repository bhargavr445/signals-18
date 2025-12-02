import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { UniversityTableComponent } from './university-table.component';

describe('UniversityTableComponent', () => {
  let component: UniversityTableComponent;
  let fixture: ComponentFixture<UniversityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],

      imports: [UniversityTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityTableComponent, {
      bindings: [
        inputBinding('universityList', signal([])),
        inputBinding('dropDownList', signal([]))
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
