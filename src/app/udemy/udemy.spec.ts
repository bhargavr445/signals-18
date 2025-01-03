import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Udemy } from './udemy';

describe('Udemy', () => {
  let component: Udemy;
  let fixture: ComponentFixture<Udemy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Udemy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Udemy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
