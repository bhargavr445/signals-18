import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { UpdateProfileService } from '../../update-profile.service';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-update-profile',
    imports: [JsonPipe],
    templateUrl: './update-profile.html',
    styleUrl: './update-profile.scss'
})
export class UpdateProfile {

    #cdr = inject(ChangeDetectorRef);
    #updateProfileService = inject(UpdateProfileService);

    response = signal(null);
    // response = null;

    getData() {
        this.#updateProfileService.fetchData().subscribe({
            next: (resp) => this.#handleSuccessReesponse(resp),
            error: (error) => this.#handleErrorResponse(error)
        })
    }

    #handleSuccessReesponse(resp) {
        // this.response = resp;
        this.response.set(resp);
        // this.#cdr.detectChanges();
    }

    #handleErrorResponse(error) {
        console.log(error);
    }

}
