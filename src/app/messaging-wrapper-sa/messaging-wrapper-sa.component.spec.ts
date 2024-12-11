import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingWrapperSaComponent } from './messaging-wrapper-sa.component';

describe('MessagingWrapperSaComponent', () => {
  let component: MessagingWrapperSaComponent;
  let fixture: ComponentFixture<MessagingWrapperSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagingWrapperSaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagingWrapperSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
