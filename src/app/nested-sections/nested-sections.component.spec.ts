import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedSectionsComponent } from './nested-sections.component';

describe('NestedSectionsComponent', () => {
  let component: NestedSectionsComponent;
  let fixture: ComponentFixture<NestedSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
