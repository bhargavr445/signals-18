import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, signal } from '@angular/core';
import { GameService } from './game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GameComponent {

  gameService = inject(GameService);
  gamesList = signal<any>([]);
  paginatedRecords = signal<any[]>([]);
  isLoading = false;

  constructor() {
    this.isLoading = true;
    // this.gamesList.set(toSignal(this.gameService.getGamesData().pipe(map((resp) => resp['data'])), {initialValue: []}));
    this.gameService.getGamesData().subscribe(
      (resp) => {
       this.gamesList.set(resp['data']);
        this.isLoading = false;
      }
    )
  }

  handlePaginatedList(event) {
    this.paginatedRecords.set(event.detail as any[]);
  }

  handleShortDesc(data: string) {    
    if(data.length > 80) {
      return `${data.substring(0,80)}...`
    }
    return data
  }

}
