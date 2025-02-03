import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetch_elections_data_start } from './store/elections-actions';
import { electionsErrorDataSelector, electionSuccessDataSelector } from './store/elections-selector';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ElectionStore } from './store/ele.store';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-elections',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './elections.component.html',
  styleUrl: './elections.component.scss',
  providers: [ElectionStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionsComponent {

  electionSignalStore = inject(ElectionStore);

  candidatesC = this.electionSignalStore.candidatesC;
  completeElectionSuccessDataC = this.electionSignalStore.completeElectionSuccessDataC;

  store = inject(Store);
  eleectiondData$ = toSignal(this.store.select(electionSuccessDataSelector));
  eleectiondDataError$ = this.store.select(electionsErrorDataSelector);


  constructor() {
    this.fetchData();
  }

  fetchData() {
    // this.eleectiondData$.subscribe((data) =>if())
    this.store.dispatch(fetch_elections_data_start());
  }

  addNewCand() {
    this.electionSignalStore.updateCandidate('Bhargav');
    this.electionSignalStore.fetchElectionData();
  }


}
