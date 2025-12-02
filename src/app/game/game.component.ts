import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { GameService } from './game.service';
import { GameCardComponent } from './game-card.component';

@Component({
    imports: [GameCardComponent],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // providers: [GameService]
})
export class GameComponent {

  #gameService = inject(GameService);
  articleName = 'Input Signals';
  gamesList = this.#gameService.gamesList;
  paginatedRecords = signal<any[]>([]);
  gamesListLoadingIndicator = this.#gameService.gamesListLoadingIndicator;

  constructor() {
    
    // this.isLoading.set(true);
    // // this.gamesList.set(toSignal(this.gameService.getGamesData().pipe(map((resp) => resp['data'])), {initialValue: []}));
    // this.#gameService.getGamesData().subscribe(
    //   (resp) => {
    //     console.log(resp);

    //     this.gamesList.set(resp['data']);
    //     this.isLoading.set(false);
    //     // this.cdr.detectChanges();
    //   }
    // )
  }

  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as any[]);
  }

  selectedGameInfo(event) {
    
  }



}
