import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ModalDataI, ToggleCloseTypes } from '../../Interfaces/ModalContentI';

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

  // modalContent = computed<ModalDataI>(() => {
  //   const modalData = this.modalService.modalLabels();
  //   const labels = {
  //     headerLabel: modalData?.headerLabel,
  //     content: modalData?.content,
  //     primaryButton: modalData?.primaryButton,
  //     secondaryButton: modalData?.secondaryButton,
  //     toggleStatus: modalData?.toggleStatus
  //   }
  //   return labels;
  // });

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
    this.modalService.closeModal();
    
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


