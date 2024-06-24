import { ComponentFactoryResolver, Injectable, inject, signal } from '@angular/core';
import { ModalContentI, ModalDataI } from '../Interfaces/ModalContentI';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  ComponentFactoryResolver = inject(ComponentFactoryResolver);
  modalLabels = signal<ModalDataI>(null);

  openModal(modalData: ModalContentI): void {
    this.modalLabels.set({
      headerLabel: modalData.headerLabel,
      content: modalData.content,
      primaryButton: modalData.primaryButton,
      secondaryButton: modalData.secondaryButton,
      toggleStatus: 'o'
    })
  }

  closeModal(): void {
    this.modalLabels.set({
      headerLabel: '',
      content: '',
      primaryButton: '',
      secondaryButton: '',
      toggleStatus: 'c'
    })
  }

  dynamicComponentOnDOM(modalHost) {
    const modalcompFactory = this.ComponentFactoryResolver.resolveComponentFactory(ModalComponent);
    const hostViewContainerRef = modalHost.viewContainerRef;
    hostViewContainerRef.clear();
    const compRef = hostViewContainerRef.createComponent(modalcompFactory);
    return compRef.instance;
  }

}
