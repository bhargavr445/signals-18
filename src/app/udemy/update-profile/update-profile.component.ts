import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { GameService } from '../../game/game.service';

@Component({
    selector: 'app-update-profile',
    imports: [],
    templateUrl: './update-profile.component.html',
    styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {

    gameService = inject(GameService);
    cdr = inject(ChangeDetectorRef);

    gamesLength = signal(0);

    fetchGames() {
        this.gameService.getGamesData().subscribe({
            next: (rep: any) => {
                console.log(rep);
                this.gamesLength.set(rep.data.length);
                
                
            },
            error: () => {},
        });
    }


}
