import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ExpandableModuleComponent } from './expandable-module.component';

fdescribe('ExpandableModuleComponent', () => {
  let component: ExpandableModuleComponent;
  let fixture: ComponentFixture<ExpandableModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [ExpandableModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandableModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
