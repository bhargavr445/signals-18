import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityOverview } from './university-overview';

describe('UniversityOverview', () => {
  let component: UniversityOverview;
  let fixture: ComponentFixture<UniversityOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
