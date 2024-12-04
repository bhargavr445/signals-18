import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingAppWrapperComponent } from './messaging-app-wrapper.component';

describe('MessagingAppWrapperComponent', () => {
  let component: MessagingAppWrapperComponent;
  let fixture: ComponentFixture<MessagingAppWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagingAppWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagingAppWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
