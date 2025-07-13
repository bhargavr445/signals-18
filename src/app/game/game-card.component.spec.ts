import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { GameCardComponent } from './game-card.component';

fdescribe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],

      imports: [GameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCardComponent, {
      bindings: [
        inputBinding('articleName', signal('')),
        inputBinding('item', signal([]))
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
