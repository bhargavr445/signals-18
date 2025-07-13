import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { NestedSectionsComponent } from './nested-sections.component';

fdescribe('NestedSectionsComponent', () => {
  let component: NestedSectionsComponent;
  let fixture: ComponentFixture<NestedSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],

      imports: [NestedSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
