import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniversityOverviewComponent } from './university-overview.component';

xdescribe('UniversityOverviewComponent', () => {
  let component: UniversityOverviewComponent;
  let fixture: ComponentFixture<UniversityOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [],
      imports: [UniversityOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
