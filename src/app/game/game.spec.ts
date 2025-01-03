import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Game } from './game';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('Game', () => {
  let component: Game;
  let fixture: ComponentFixture<Game>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Game, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Game);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
