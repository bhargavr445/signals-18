import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { GameService } from './game.service';
import { GameCardComponent } from './game-card.component';

@Component({
    imports: [GameCardComponent],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GameComponent {

  articleName = 'Input Signals';
  #gameService = inject(GameService);
  gamesList = signal<any>([]);
  paginatedRecords = signal<any[]>([]);
  isLoading = signal(false);

  constructor() {
    this.isLoading.set(true);
    // this.gamesList.set(toSignal(this.gameService.getGamesData().pipe(map((resp) => resp['data'])), {initialValue: []}));
    this.#gameService.getGamesData().subscribe(
      (resp) => {
        console.log(resp);

        this.gamesList.set(resp['data']);
        this.isLoading.set(false);
        // this.cdr.detectChanges();
      }
    )
  }

  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as any[]);
  }

  selectedGameInfo(event) {
    
  }



}
