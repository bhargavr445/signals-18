import { ChangeDetectorRef, Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../../game/game.service';

@Component({
    selector: 'app-update-profile',
    imports: [],
    templateUrl: './update-profile.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {

    gameService = inject(GameService);
    cdr = inject(ChangeDetectorRef);

    gamesLength = signal(0);

    fetchGames() {

        this.gameService.getGamesData().subscribe({
            next: (rep: any) => {
                this.gamesLength.set(rep.data.length);
                
                
            },
            error: () => {},
        });
    }


}
