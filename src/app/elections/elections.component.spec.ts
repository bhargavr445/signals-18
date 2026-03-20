import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ElectionsComponent } from './elections.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
//TODO:
xdescribe('ElectionsComponent', () => {
  let component: ElectionsComponent;
  let fixture: ComponentFixture<ElectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],

      imports: [ElectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // component.addNewCand()
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("button#new-btn"); // or ".save-btn"
    expect(button).toBeTruthy();
    button.click();              

  });
});
