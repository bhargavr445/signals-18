import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { ToggleCloseTypes } from '../../Interfaces/ModalContentI';
import { ModalService } from '../../services/api/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalComponent {

  modalService = inject(ModalService);
  @Output() closeEvent = new EventEmitter<ToggleCloseTypes>();
  modalContent = signal(null);

  openModal(modalData) {
    this.modalContent.set( {
      headerLabel: modalData?.headerLabel,
      content: modalData?.content,
      primaryButton: modalData?.primaryButton,
      secondaryButton: modalData?.secondaryButton,
      toggleStatus: modalData?.toggleStatus
    })
  }



  handleCloseType(event) {    
    this.closeEvent.emit(event.detail)
    this.modalContent.set({
      headerLabel: '',
      content: '',
      primaryButton: '',
      secondaryButton: '',
      toggleStatus: 'c'
    })
  }

}


