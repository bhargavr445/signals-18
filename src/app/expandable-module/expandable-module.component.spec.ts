import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableModuleComponent } from './expandable-module.component';

describe('ExpandableModuleComponent', () => {
  let component: ExpandableModuleComponent;
  let fixture: ComponentFixture<ExpandableModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
